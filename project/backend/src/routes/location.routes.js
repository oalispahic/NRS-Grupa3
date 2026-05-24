const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const locationController = require('../controllers/location.controller');

router.get('/', locationController.getAll);

router.use(authenticate);
router.post('/', requireRole('admin', 'test'), locationController.create);
router.put('/:id', requireRole('admin', 'test'), locationController.update);
router.delete('/:id', requireRole('admin', 'test'), locationController.remove);

module.exports = router;
