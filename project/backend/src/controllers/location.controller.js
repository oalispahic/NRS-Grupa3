const locationService = require('../services/location.service');

async function getAll(req, res, next) {
  try { res.json(await locationService.getAll()); } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const location = await locationService.create(req.body);
    res.status(201).json(location);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try { res.json(await locationService.update(req.params.id, req.body)); } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try { await locationService.remove(req.params.id); res.status(204).end(); } catch (err) { next(err); }
}

module.exports = { getAll, create, update, remove };
