const userService = require('../services/user.service');

async function getProfile(req, res, next) {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const userRepo = require('../repositories/user.repository');
    res.json(await userRepo.findAll());
  } catch (err) { next(err); }
}

async function setRole(req, res, next) {
  try {
    const userRepo = require('../repositories/user.repository');
    const { role } = req.body;
    if (!['laborant', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Nevalidna uloga' });
    }
    const user = await userRepo.setRole(req.params.id, role);
    if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
    res.json(user);
  } catch (err) { next(err); }
}

async function setActive(req, res, next) {
  try {
    const userRepo = require('../repositories/user.repository');
    const { is_active } = req.body;
    const user = await userRepo.setActive(req.params.id, is_active);
    if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
    res.json(user);
  } catch (err) { next(err); }
}

module.exports = { getProfile, updateProfile, getAllUsers, setRole, setActive };
