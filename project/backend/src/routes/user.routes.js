const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

router.get('/', requireRole('admin', 'test'), userController.getAllUsers);
router.patch('/:id/role', requireRole('admin', 'test'), userController.setRole);
router.patch('/:id/active', requireRole('admin', 'test'), userController.setActive);

module.exports = router;
