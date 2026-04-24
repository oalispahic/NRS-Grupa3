const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const equipmentController = require('../controllers/equipment.controller');

router.get('/', equipmentController.list);
router.get('/:id', equipmentController.getOne);
router.post('/', authenticate, requireRole('admin'), equipmentController.create);
router.delete('/:id', authenticate, requireRole('admin'), equipmentController.remove);

module.exports = router;
