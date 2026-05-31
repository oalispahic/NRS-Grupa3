const pool = require('../config/db');

async function create({ userId, action, entityType, entityId, details }) {
  const { rows } = await pool.query(
    `INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId || null, action, entityType || null, entityId || null, details || null]
  );
  return rows[0];
}

async function findAll({ limit = 100, offset = 0 } = {}) {
  const lim = Math.min(parseInt(limit) || 100, 200);
  const off = Math.max(parseInt(offset) || 0, 0);
  const { rows } = await pool.query(
    `SELECT al.*, u.full_name, u.email
     FROM activity_logs al
     LEFT JOIN users u ON u.id = al.user_id
     ORDER BY al.created_at DESC
     LIMIT ${lim} OFFSET ${off}`
  );
  return rows;
}

async function count() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM activity_logs');
  return parseInt(rows[0].count, 10);
}

async function findByUser({ userId, limit = 50, offset = 0, type = null } = {}) {
  const lim = Math.min(parseInt(limit) || 50, 200);
  const off = Math.max(parseInt(offset) || 0, 0);
  const params = [userId];
  let typeClause = '';
  if (type) {
    params.push(type);
    typeClause = `AND al.action = $2`;
  }
  const { rows } = await pool.query(
    `SELECT al.*, u.full_name, u.email
     FROM activity_logs al
     LEFT JOIN users u ON u.id = al.user_id
     WHERE al.user_id = $1 ${typeClause}
     ORDER BY al.created_at DESC
     LIMIT ${lim} OFFSET ${off}`,
    params
  );
  return rows;
}

async function countByUser(userId) {
  const { rows } = await pool.query(
    'SELECT COUNT(*) FROM activity_logs WHERE user_id = $1',
    [userId]
  );
  return parseInt(rows[0].count, 10);
}

module.exports = { create, findAll, count, findByUser, countByUser };
