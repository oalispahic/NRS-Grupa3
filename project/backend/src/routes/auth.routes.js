const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/register - registracija novog korisnika
router.post('/register', authController.register);

// POST /api/auth/login - prijava korisnika
router.post('/login', authController.login);

module.exports = router;
