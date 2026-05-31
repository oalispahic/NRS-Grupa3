const reservationRepo = require('../repositories/reservation.repository');
const equipmentRepo = require('../repositories/equipment.repository');
const notificationService = require('./notification.service');
const activityService = require('./activity.service');
const settingsRepo = require('../repositories/settings.repository');

async function createReservation({ userId, equipmentId, startTime, endTime, waitlist = false }) {
  if (!userId || !equipmentId || !startTime || !endTime) {
    const err = new Error('Sva polja su obavezna: oprema, pocetak i kraj termina');
    err.status = 400;
    throw err;
  }
  if (new Date(endTime) <= new Date(startTime)) {
    const err = new Error('Kraj termina mora biti nakon pocetka');
    err.status = 400;
    throw err;
  }

  const equipment = await equipmentRepo.findById(equipmentId);
  if (!equipment) {
    const err = new Error('Oprema nije pronadjena');
    err.status = 404;
    throw err;
  }

  const [maxDaysStr, maxAdvanceStr, maxActiveStr] = await Promise.all([
    settingsRepo.get('max_reservation_days'),
    settingsRepo.get('max_advance_days'),
    settingsRepo.get('max_active_reservations'),
  ]);

  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationDays = (end - start) / (1000 * 60 * 60 * 24);
  const maxDays = parseInt(maxDaysStr || '30');
  if (durationDays > maxDays) {
    const err = new Error(`Rezervacija ne može trajati duže od ${maxDays} dana`);
    err.status = 400;
    throw err;
  }

  const maxAdvance = parseInt(maxAdvanceStr || '90');
  const advanceDays = (start - new Date()) / (1000 * 60 * 60 * 24);
  if (advanceDays > maxAdvance) {
    const err = new Error(`Rezervacija ne može biti kreirana više od ${maxAdvance} dana unaprijed`);
    err.status = 400;
    throw err;
  }

  const maxActive = parseInt(maxActiveStr || '5');
  const activeCount = await reservationRepo.countActiveByUser(userId);
  if (activeCount >= maxActive) {
    const err = new Error(`Ne možete imati više od ${maxActive} aktivnih rezervacija istovremeno`);
    err.status = 400;
    throw err;
  }

  if (!waitlist) {
    const conflict = await reservationRepo.findConflict(equipmentId, startTime, endTime);
    if (conflict) {
      const err = new Error('Oprema je vec rezervisana za odabrani termin');
      err.status = 409;
      throw err;
    }
  }

  const reservation = await reservationRepo.create({ userId, equipmentId, startTime, endTime });

  if (equipment.status === 'available') {
    await equipmentRepo.update(equipmentId, { status: 'reserved' });
  }

  activityService.log({ userId, action: 'reservation_created', entityType: 'reservation', entityId: reservation.id, details: `Oprema: ${equipment.name}` });

  return reservation;
}

async function getMyReservations(userId) {
  return reservationRepo.findByUserId(userId);
}

async function getAllReservations(status) {
  return reservationRepo.findAll(status || null);
}

async function approveReservation(id, adminUserId) {
  const reservation = await reservationRepo.updateStatus(id, 'approved');
  if (!reservation) {
    const err = new Error('Reservation not found');
    err.status = 404;
    throw err;
  }
  const equipment = await equipmentRepo.findById(reservation.equipment_id);
  notificationService.notifyReservationApproved(reservation.user_id, equipment?.name || '').catch(() => {});
  activityService.log({ userId: adminUserId, action: 'reservation_approved', entityType: 'reservation', entityId: reservation.id, details: `Oprema: ${equipment?.name}` });
  return reservation;
}

async function rejectReservation(id, adminUserId, reason) {
  const reservation = await reservationRepo.updateStatus(id, 'rejected', reason || null);
  if (!reservation) {
    const err = new Error('Reservation not found');
    err.status = 404;
    throw err;
  }

  const active = await reservationRepo.countActive(reservation.equipment_id);
  if (active === 0) {
    const equipment = await equipmentRepo.findById(reservation.equipment_id);
    if (equipment?.status === 'reserved') {
      await equipmentRepo.update(reservation.equipment_id, { status: 'available' });
    }
  }

  const equipment2 = await equipmentRepo.findById(reservation.equipment_id);
  notificationService.notifyReservationRejected(reservation.user_id, equipment2?.name || '', reason).catch(() => {});
  activityService.log({ userId: adminUserId, action: 'reservation_rejected', entityType: 'reservation', entityId: reservation.id, details: `Oprema: ${equipment2?.name}` });

  return reservation;
}

async function cancelReservation(reservationId, userId) {
  const reservation = await reservationRepo.findByIdAndUser(reservationId, userId);
  if (!reservation) {
    const err = new Error('Rezervacija nije pronadjena');
    err.status = 404;
    throw err;
  }
  if (reservation.status === 'rejected') {
    const err = new Error('Rezervacija je vec otkazana');
    err.status = 400;
    throw err;
  }

  const updated = await reservationRepo.updateStatus(reservationId, 'rejected');

  const active = await reservationRepo.countActive(updated.equipment_id);
  if (active === 0) {
    const equipment = await equipmentRepo.findById(updated.equipment_id);
    if (equipment?.status === 'reserved') {
      await equipmentRepo.update(updated.equipment_id, { status: 'available' });
    }
  }

  activityService.log({ userId, action: 'reservation_cancelled', entityType: 'reservation', entityId: reservationId });

  return updated;
}

async function updateReservationDates(reservationId, userId, startTime, endTime) {
  if (!startTime || !endTime) {
    const err = new Error('Pocetak i kraj termina su obavezni');
    err.status = 400;
    throw err;
  }
  if (new Date(endTime) <= new Date(startTime)) {
    const err = new Error('Kraj termina mora biti nakon pocetka');
    err.status = 400;
    throw err;
  }

  const reservation = await reservationRepo.findByIdAndUser(reservationId, userId);
  if (!reservation) {
    const err = new Error('Rezervacija nije pronadjena');
    err.status = 404;
    throw err;
  }
  if (reservation.status === 'rejected') {
    const err = new Error('Nije moguce izmijeniti otkazanu rezervaciju');
    err.status = 400;
    throw err;
  }

  const conflict = await reservationRepo.findConflictExcluding(
    reservation.equipment_id, startTime, endTime, reservationId
  );
  if (conflict) {
    const err = new Error('Oprema je vec rezervisana za odabrani termin');
    err.status = 409;
    throw err;
  }

  return reservationRepo.updateDates(reservationId, startTime, endTime);
}

async function returnReservation(reservationId, userId) {
  const updated = await reservationRepo.returnEarly(reservationId, userId);
  if (!updated) {
    const err = new Error('Rezervacija nije pronađena ili nije trenutno u toku');
    err.status = 400;
    throw err;
  }

  const equipment = await equipmentRepo.findById(updated.equipment_id);

  if (equipment?.status === 'reserved') {
    const active = await reservationRepo.countActive(updated.equipment_id);
    if (active === 0) {
      await equipmentRepo.update(updated.equipment_id, { status: 'available' });
    }
  }

  activityService.log({
    userId,
    action: 'Oprema vracena',
    entityType: 'reservation',
    entityId: reservationId,
    details: equipment?.name ? `Oprema: ${equipment.name}` : undefined,
  }).catch(() => {});

  return updated;
}

async function getCurrentlyActive() {
  return reservationRepo.findCurrentlyActive();
}

module.exports = {
  createReservation, getMyReservations, getAllReservations,
  approveReservation, rejectReservation,
  cancelReservation, updateReservationDates,
  returnReservation, getCurrentlyActive,
};
