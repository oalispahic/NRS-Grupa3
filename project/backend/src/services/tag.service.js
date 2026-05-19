const tagRepo = require('../repositories/tag.repository');

async function getAllTags() {
  return tagRepo.findAll();
}

async function createTag({ name, color }) {
  if (!name?.trim()) {
    const err = new Error('Naziv taga je obavezan');
    err.status = 400;
    throw err;
  }
  return tagRepo.create({ name: name.trim(), color });
}

async function deleteTag(id) {
  const deleted = await tagRepo.remove(id);
  if (!deleted) {
    const err = new Error('Tag nije pronađen');
    err.status = 404;
    throw err;
  }
}

async function getEquipmentTags(equipmentId) {
  return tagRepo.findByEquipment(equipmentId);
}

async function setEquipmentTags(equipmentId, tagIds) {
  const pool = require('../config/db');
  await pool.query('DELETE FROM equipment_tags WHERE equipment_id = $1', [equipmentId]);
  for (const tagId of tagIds) {
    await tagRepo.addToEquipment(equipmentId, tagId);
  }
  return tagRepo.findByEquipment(equipmentId);
}

module.exports = { getAllTags, createTag, deleteTag, getEquipmentTags, setEquipmentTags };
