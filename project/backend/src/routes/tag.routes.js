const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const tagController = require('../controllers/tag.controller');

router.get('/', tagController.getAll);
router.post('/', authenticate, requireRole('admin', 'test'), tagController.create);
router.delete('/:id', authenticate, requireRole('admin', 'test'), tagController.remove);

module.exports = router;
