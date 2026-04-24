const reservationService = require('../services/reservation.service');

async function create(req, res, next) {
  try {
    const reservation = await reservationService.createReservation({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
}

async function myReservations(req, res, next) {
  try {
    const reservations = await reservationService.getMyReservations(req.user.id);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, myReservations };
