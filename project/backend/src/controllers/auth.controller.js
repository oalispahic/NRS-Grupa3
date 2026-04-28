const authService = require('../services/auth.service');

/**
 * Kontroler za registraciju novog korisnika.
 * Prima email, password i fullName iz request body-ja.
 */
async function handleRegister(req, res, next) {
  try {
    const noviKorisnik = await authService.register(req.body);
    return res.status(201).json({ user: noviKorisnik });
  } catch (err) {
    next(err);
  }
}

/**
 * Kontroler za prijavu korisnika.
 * Vraca JWT token i korisnicke podatke ako su kredencijali ispravni.
 */
async function handleLogin(req, res, next) {
  try {
    const rezultat = await authService.login(req.body);
    return res.json(rezultat);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register: handleRegister,
  login:    handleLogin,
};
