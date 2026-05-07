const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const equipmentController = require('../controllers/equipment.controller');

router.get('/', equipmentController.list);
router.get('/:id', equipmentController.getOne);
router.post('/', authenticate, requireRole('admin', 'test'), equipmentController.create);
router.put('/:id', authenticate, requireRole('admin', 'test'), equipmentController.update);
router.delete('/:id', authenticate, requireRole('admin', 'test'), equipmentController.remove);

module.exports = router;
