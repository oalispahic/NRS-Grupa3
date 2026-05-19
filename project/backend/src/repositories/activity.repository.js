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
  const { rows } = await pool.query(
    `SELECT al.*, u.full_name, u.email
     FROM activity_logs al
     LEFT JOIN users u ON u.id = al.user_id
     ORDER BY al.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}

async function count() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM activity_logs');
  return parseInt(rows[0].count, 10);
}

module.exports = { create, findAll, count };
