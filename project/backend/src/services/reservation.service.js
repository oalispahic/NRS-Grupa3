const reservationRepo = require('../repositories/reservation.repository');
const equipmentRepo = require('../repositories/equipment.repository');
const notificationService = require('./notification.service');
const activityService = require('./activity.service');

async function createReservation({ userId, equipmentId, startTime, endTime }) {
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

  const conflict = await reservationRepo.findConflict(equipmentId, startTime, endTime);
  if (conflict) {
    const err = new Error('Oprema je vec rezervisana za odabrani termin');
    err.status = 409;
    throw err;
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

async function rejectReservation(id, adminUserId) {
  const reservation = await reservationRepo.updateStatus(id, 'rejected');
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
  notificationService.notifyReservationRejected(reservation.user_id, equipment2?.name || '').catch(() => {});
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

async function getCurrentlyActive() {
  return reservationRepo.findCurrentlyActive();
}

module.exports = {
  createReservation, getMyReservations, getAllReservations,
  approveReservation, rejectReservation,
  cancelReservation, updateReservationDates,
  getCurrentlyActive,
};
