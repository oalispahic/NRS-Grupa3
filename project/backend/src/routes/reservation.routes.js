const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const reservationController = require('../controllers/reservation.controller');

router.use(authenticate);

router.post('/', reservationController.create);
router.get('/my', reservationController.myReservations);

module.exports = router;
