const reservationRepo = require('../repositories/reservation.repository');
const equipmentRepo = require('../repositories/equipment.repository');

async function createReservation({ userId, equipmentId, startTime, endTime }) {
  if (!userId || !equipmentId || !startTime || !endTime) {
    const err = new Error('userId, equipmentId, startTime and endTime are required');
    err.status = 400;
    throw err;
  }
  if (new Date(endTime) <= new Date(startTime)) {
    const err = new Error('endTime must be after startTime');
    err.status = 400;
    throw err;
  }

  const equipment = await equipmentRepo.findById(equipmentId);
  if (!equipment) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }

  const conflict = await reservationRepo.findConflict(equipmentId, startTime, endTime);
  if (conflict) {
    const err = new Error('Equipment is already reserved for this time slot');
    err.status = 409;
    throw err;
  }

  return reservationRepo.create({ userId, equipmentId, startTime, endTime });
}

async function getMyReservations(userId) {
  return reservationRepo.findByUserId(userId);
}

module.exports = { createReservation, getMyReservations };
