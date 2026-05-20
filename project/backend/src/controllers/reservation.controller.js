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

async function getAll(req, res, next) {
  try {
    const reservations = await reservationService.getAllReservations(req.query.status);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
}

async function approve(req, res, next) {
  try {
    const reservation = await reservationService.approveReservation(req.params.id, req.user.id);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function reject(req, res, next) {
  try {
    const reservation = await reservationService.rejectReservation(req.params.id, req.user.id);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function cancel(req, res, next) {
  try {
    const reservation = await reservationService.cancelReservation(req.params.id, req.user.id);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function updateDates(req, res, next) {
  try {
    const reservation = await reservationService.updateReservationDates(
      req.params.id, req.user.id, req.body.startTime, req.body.endTime
    );
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function returnEarly(req, res, next) {
  try {
    const reservation = await reservationService.returnReservation(req.params.id, req.user.id);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function getCurrent(req, res, next) {
  try {
    const reservations = await reservationService.getCurrentlyActive();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, myReservations, getAll, getCurrent, approve, reject, cancel, updateDates, returnEarly };
