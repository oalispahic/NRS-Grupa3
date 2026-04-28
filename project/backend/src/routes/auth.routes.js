const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/register - register a new user
router.post('/register', authController.register);

// POST /api/auth/login - login with credentials
router.post('/login', authController.login);

module.exports = router;
