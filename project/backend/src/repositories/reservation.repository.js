const pool = require('../config/db');

async function findConflict(equipmentId, startTime, endTime) {
  const { rows } = await pool.query(
    `SELECT id FROM reservations
     WHERE equipment_id = $1
       AND status IN ('pending', 'approved')
       AND start_time < $3
       AND end_time   > $2
     LIMIT 1`,
    [equipmentId, startTime, endTime]
  );
  return rows[0] || null;
}

async function findConflictExcluding(equipmentId, startTime, endTime, excludeId) {
  const { rows } = await pool.query(
    `SELECT id FROM reservations
     WHERE equipment_id = $1
       AND id != $4
       AND status IN ('pending', 'approved')
       AND start_time < $3
       AND end_time   > $2
     LIMIT 1`,
    [equipmentId, startTime, endTime, excludeId]
  );
  return rows[0] || null;
}

async function create({ userId, equipmentId, startTime, endTime }) {
  const { rows } = await pool.query(
    `INSERT INTO reservations (user_id, equipment_id, start_time, end_time)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, equipmentId, startTime, endTime]
  );
  return rows[0];
}

async function findByUserId(userId) {
  const { rows } = await pool.query(
    `SELECT r.*, e.name AS equipment_name
     FROM reservations r
     JOIN equipment e ON e.id = r.equipment_id
     WHERE r.user_id = $1
     ORDER BY r.created_at DESC`,
    [userId]
  );
  return rows;
}

async function findByIdAndUser(id, userId) {
  const { rows } = await pool.query(
    `SELECT * FROM reservations WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return rows[0] || null;
}

async function findAll(status) {
  const params = [];
  const where = status ? (params.push(status), `WHERE r.status = $1`) : '';
  const { rows } = await pool.query(
    `SELECT r.*, u.full_name, u.email, e.name AS equipment_name
     FROM reservations r
     JOIN users u ON u.id = r.user_id
     JOIN equipment e ON e.id = r.equipment_id
     ${where}
     ORDER BY r.created_at DESC`,
    params
  );
  return rows;
}

async function updateStatus(id, status) {
  const { rows } = await pool.query(
    `UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return rows[0] || null;
}

async function updateDates(id, startTime, endTime) {
  const { rows } = await pool.query(
    `UPDATE reservations SET start_time = $1, end_time = $2, status = 'pending'
     WHERE id = $3 RETURNING *`,
    [startTime, endTime, id]
  );
  return rows[0] || null;
}

async function countActive(equipmentId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM reservations
     WHERE equipment_id = $1 AND status IN ('pending', 'approved')`,
    [equipmentId]
  );
  return parseInt(rows[0].count, 10);
}

async function findActiveByEquipment(equipmentId) {
  const { rows } = await pool.query(
    `SELECT id, start_time, end_time FROM reservations
     WHERE equipment_id = $1 AND status IN ('pending', 'approved')
     ORDER BY start_time`,
    [equipmentId]
  );
  return rows;
}

module.exports = {
  findConflict, findConflictExcluding,
  create, findByUserId, findByIdAndUser, findAll,
  updateStatus, updateDates,
  countActive, findActiveByEquipment,
};
