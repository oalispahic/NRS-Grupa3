const equipmentRepo = require('../repositories/equipment.repository');

async function listAll() {
  return equipmentRepo.findAll();
}

async function getById(id) {
  const equipment = await equipmentRepo.findById(id);
  if (!equipment) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }
  return equipment;
}

async function create({ name, description, status, location }) {
  if (!name) {
    const err = new Error('name is required');
    err.status = 400;
    throw err;
  }
  return equipmentRepo.create({ name, description, status, location });
}

const VALID_STATUSES = ['available', 'reserved', 'in_use', 'maintenance', 'out_of_service'];

async function update(id, data) {
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    const err = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    err.status = 400;
    throw err;
  }
  const updated = await equipmentRepo.update(id, data);
  if (!updated) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }
  return updated;
}

async function remove(id) {
  const deleted = await equipmentRepo.remove(id);
  if (!deleted) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }
}

module.exports = { listAll, getById, create, update, remove };
