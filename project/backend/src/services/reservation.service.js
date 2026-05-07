const reservationRepo = require('../repositories/reservation.repository');
const equipmentRepo = require('../repositories/equipment.repository');

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

  return reservation;
}

async function getMyReservations(userId) {
  return reservationRepo.findByUserId(userId);
}

async function getAllReservations(status) {
  return reservationRepo.findAll(status || null);
}

async function approveReservation(id) {
  const reservation = await reservationRepo.updateStatus(id, 'approved');
  if (!reservation) {
    const err = new Error('Reservation not found');
    err.status = 404;
    throw err;
  }
  return reservation;
}

async function rejectReservation(id) {
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

  return reservation;
}

module.exports = { createReservation, getMyReservations, getAllReservations, approveReservation, rejectReservation };
