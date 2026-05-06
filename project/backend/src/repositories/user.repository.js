const pool = require('../config/db');

async function findByUsername(username) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [username]
  );
  return result.rows[0] || null;
}

async function create({ username, passwordHash, fullName, role = 'laborant' }) {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email AS username, full_name, role, created_at`,
    [username, passwordHash, fullName, role]
  );
  return result.rows[0];
}

module.exports = { findByUsername, create };
