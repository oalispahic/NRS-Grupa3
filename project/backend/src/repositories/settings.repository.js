const pool = require('../config/db');

async function getAll() {
  const { rows } = await pool.query('SELECT * FROM system_settings ORDER BY key');
  return rows;
}

async function get(key) {
  const { rows } = await pool.query('SELECT value FROM system_settings WHERE key = $1', [key]);
  return rows[0]?.value ?? null;
}

async function set(key, value) {
  const { rows } = await pool.query(
    `INSERT INTO system_settings (key, value, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
     RETURNING *`,
    [key, String(value)]
  );
  return rows[0];
}

module.exports = { getAll, get, set };
