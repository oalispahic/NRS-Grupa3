const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const reservationController = require('../controllers/reservation.controller');

router.use(authenticate);

router.post('/', reservationController.create);
router.get('/my', reservationController.myReservations);

router.get('/', requireRole('admin', 'test'), reservationController.getAll);
router.patch('/:id/approve', requireRole('admin', 'test'), reservationController.approve);
router.patch('/:id/reject', requireRole('admin', 'test'), reservationController.reject);

module.exports = router;
