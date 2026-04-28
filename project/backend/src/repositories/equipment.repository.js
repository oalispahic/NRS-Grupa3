const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query(
    'SELECT * FROM equipment ORDER BY created_at DESC'
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM equipment WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function create({ name, description, status = 'available', location }) {
  const { rows } = await pool.query(
    `INSERT INTO equipment (name, description, status, location)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, description, status, location]
  );
  return rows[0];
}

async function update(id, { name, description, status, location }) {
  const { rows } = await pool.query(
    `UPDATE equipment
     SET name        = COALESCE($2, name),
         description = COALESCE($3, description),
         status      = COALESCE($4, status),
         location    = COALESCE($5, location)
     WHERE id = $1
     RETURNING *`,
    [id, name, description, status, location]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM equipment WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };
