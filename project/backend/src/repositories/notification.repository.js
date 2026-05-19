const pool = require('../config/db');

async function create({ userId, type, title, message }) {
  const { rows } = await pool.query(
    `INSERT INTO notifications (user_id, type, title, message)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, type, title, message]
  );
  return rows[0];
}

async function findByUser(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return rows;
}

async function countUnread(userId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = FALSE`,
    [userId]
  );
  return parseInt(rows[0].count, 10);
}

async function markRead(id, userId) {
  const { rows } = await pool.query(
    `UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  return rows[0] || null;
}

async function markAllRead(userId) {
  await pool.query(
    `UPDATE notifications SET is_read = TRUE WHERE user_id = $1`,
    [userId]
  );
}

module.exports = { create, findByUser, countUnread, markRead, markAllRead };
