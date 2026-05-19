const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const notificationController = require('../controllers/notification.controller');

router.use(authenticate);

router.get('/', notificationController.getAll);
router.patch('/read-all', notificationController.markAll);
router.patch('/:id/read', notificationController.markOne);

module.exports = router;
