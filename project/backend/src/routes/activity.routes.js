const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const activityController = require('../controllers/activity.controller');

router.get('/', authenticate, requireRole('admin', 'test'), activityController.getAll);

module.exports = router;
