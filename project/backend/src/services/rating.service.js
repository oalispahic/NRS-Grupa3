const ratingRepo = require('../repositories/rating.repository');
const reservationRepo = require('../repositories/reservation.repository');
const equipmentRepo = require('../repositories/equipment.repository');
const activityService = require('./activity.service');

async function addRating({ userId, equipmentId, reservationId, rating, comment }) {
  if (!rating || rating < 1 || rating > 5) {
    const err = new Error('Ocjena mora biti između 1 i 5');
    err.status = 400;
    throw err;
  }

  const reservation = await reservationRepo.findByIdAndUser(reservationId, userId);
  if (!reservation) {
    const err = new Error('Rezervacija nije pronađena');
    err.status = 404;
    throw err;
  }
  if (reservation.status !== 'approved') {
    const err = new Error('Možete ocijeniti samo odobrene rezervacije');
    err.status = 400;
    throw err;
  }
  if (new Date(reservation.end_time) > new Date()) {
    const err = new Error('Možete ocijeniti opremu tek nakon isteka rezervacije');
    err.status = 400;
    throw err;
  }

  const existing = await ratingRepo.findByReservation(reservationId);
  if (existing) {
    const err = new Error('Već ste ocijenili ovu rezervaciju');
    err.status = 409;
    throw err;
  }

  const created = await ratingRepo.create({ userId, equipmentId, reservationId, rating, comment });

  const equipment = await equipmentRepo.findById(equipmentId);
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const details = [
    `Oprema: ${equipment?.name || equipmentId}`,
    `${stars} (${rating}/5)`,
    comment ? `"${comment}"` : null,
  ].filter(Boolean).join(' — ');

  activityService.log({
    userId,
    action: 'ocjena_opreme',
    entityType: 'equipment',
    entityId: equipmentId,
    details,
  }).catch(() => {});

  return created;
}

async function getEquipmentRatings(equipmentId) {
  const [ratings, summary] = await Promise.all([
    ratingRepo.findByEquipment(equipmentId),
    ratingRepo.getAverage(equipmentId),
  ]);
  return { ratings, summary };
}

async function getReservationRating(reservationId) {
  return ratingRepo.findByReservation(reservationId);
}

module.exports = { addRating, getEquipmentRatings, getReservationRating };
