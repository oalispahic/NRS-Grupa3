const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query('SELECT * FROM locations ORDER BY name ASC');
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM locations WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create({ name, description }) {
  const { rows } = await pool.query(
    'INSERT INTO locations (name, description) VALUES ($1, $2) RETURNING *',
    [name, description || null]
  );
  return rows[0];
}

async function update(id, { name, description }) {
  const { rows } = await pool.query(
    'UPDATE locations SET name = COALESCE($2, name), description = $3 WHERE id = $1 RETURNING *',
    [id, name, description ?? null]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM locations WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };
