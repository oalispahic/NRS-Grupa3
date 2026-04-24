const equipmentService = require('../services/equipment.service');

async function list(req, res, next) {
  try {
    const equipment = await equipmentService.listAll();
    res.json(equipment);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const equipment = await equipmentService.getById(req.params.id);
    res.json(equipment);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const equipment = await equipmentService.create(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await equipmentService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, remove };
