const pool = require('../config/db');

async function add(equipmentId, userId) {
  const { rows } = await pool.query(
    `INSERT INTO waitlist (equipment_id, user_id) VALUES ($1, $2)
     ON CONFLICT (equipment_id, user_id) DO NOTHING RETURNING *`,
    [equipmentId, userId]
  );
  return rows[0] || null;
}

async function remove(equipmentId, userId) {
  const { rowCount } = await pool.query(
    `DELETE FROM waitlist WHERE equipment_id = $1 AND user_id = $2`,
    [equipmentId, userId]
  );
  return rowCount > 0;
}

async function findByEquipment(equipmentId) {
  const { rows } = await pool.query(
    `SELECT w.*, u.full_name, u.email
     FROM waitlist w
     JOIN users u ON u.id = w.user_id
     WHERE w.equipment_id = $1
     ORDER BY w.created_at ASC`,
    [equipmentId]
  );
  return rows;
}

async function getUserPosition(equipmentId, userId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS position
     FROM waitlist
     WHERE equipment_id = $1 AND created_at <= (
       SELECT created_at FROM waitlist WHERE equipment_id = $1 AND user_id = $2
     )`,
    [equipmentId, userId]
  );
  return rows[0] ? parseInt(rows[0].position, 10) : null;
}

async function isOnWaitlist(equipmentId, userId) {
  const { rows } = await pool.query(
    `SELECT 1 FROM waitlist WHERE equipment_id = $1 AND user_id = $2`,
    [equipmentId, userId]
  );
  return rows.length > 0;
}

async function clearForEquipment(equipmentId) {
  await pool.query(`DELETE FROM waitlist WHERE equipment_id = $1`, [equipmentId]);
}

module.exports = { add, remove, findByEquipment, getUserPosition, isOnWaitlist, clearForEquipment };
