const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/maintenance.controller');

router.get('/mine', authenticate, ctrl.myTasks);

router.get('/', authenticate, requireRole('admin', 'test'), ctrl.list);
router.post('/', authenticate, requireRole('admin', 'test'), ctrl.create);
router.put('/:id', authenticate, requireRole('admin', 'test'), ctrl.update);
router.delete('/:id', authenticate, requireRole('admin', 'test'), ctrl.remove);

router.patch('/:id/status', authenticate, ctrl.updateStatus);

module.exports = router;
