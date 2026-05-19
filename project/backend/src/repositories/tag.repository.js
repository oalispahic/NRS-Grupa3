const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query('SELECT * FROM tags ORDER BY name ASC');
  return rows;
}

async function create({ name, color }) {
  const { rows } = await pool.query(
    `INSERT INTO tags (name, color) VALUES ($1, $2) RETURNING *`,
    [name, color || '#3b82f6']
  );
  return rows[0];
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM tags WHERE id = $1', [id]);
  return rowCount > 0;
}

async function findByEquipment(equipmentId) {
  const { rows } = await pool.query(
    `SELECT t.* FROM tags t
     JOIN equipment_tags et ON et.tag_id = t.id
     WHERE et.equipment_id = $1
     ORDER BY t.name`,
    [equipmentId]
  );
  return rows;
}

async function addToEquipment(equipmentId, tagId) {
  await pool.query(
    `INSERT INTO equipment_tags (equipment_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [equipmentId, tagId]
  );
}

async function removeFromEquipment(equipmentId, tagId) {
  const { rowCount } = await pool.query(
    'DELETE FROM equipment_tags WHERE equipment_id = $1 AND tag_id = $2',
    [equipmentId, tagId]
  );
  return rowCount > 0;
}

module.exports = { findAll, create, remove, findByEquipment, addToEquipment, removeFromEquipment };
