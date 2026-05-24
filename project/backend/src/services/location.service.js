const locationRepo = require('../repositories/location.repository');

async function getAll() {
  return locationRepo.findAll();
}

async function create({ name, description }) {
  if (!name?.trim()) {
    const err = new Error('Naziv lokacije je obavezan');
    err.status = 400;
    throw err;
  }
  return locationRepo.create({ name: name.trim(), description: description?.trim() || null });
}

async function update(id, data) {
  const location = await locationRepo.update(id, data);
  if (!location) {
    const err = new Error('Lokacija nije pronađena');
    err.status = 404;
    throw err;
  }
  return location;
}

async function remove(id) {
  const ok = await locationRepo.remove(id);
  if (!ok) {
    const err = new Error('Lokacija nije pronađena');
    err.status = 404;
    throw err;
  }
}

module.exports = { getAll, create, update, remove };
