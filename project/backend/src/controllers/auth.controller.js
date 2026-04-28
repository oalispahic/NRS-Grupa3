const authService = require('../services/auth.service');

/**
 * Controller for user registration.
 * Accepts email, password and fullName from request body.
 */
async function handleRegister(req, res, next) {
  try {
    const newUser = await authService.register(req.body);
    return res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller for user login.
 * Returns JWT token and user data if credentials are valid.
 */
async function handleLogin(req, res, next) {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register: handleRegister,
  login:    handleLogin,
};
