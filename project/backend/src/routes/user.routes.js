const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
