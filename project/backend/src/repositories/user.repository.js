const pool = require('../config/db');

/**
 * Finds a user by their email address.
 * Returns the user object or null if not found.
 */
async function findByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

/**
 * Creates a new user in the database.
 * Default role is 'laborant'.
 */
async function create({ email, passwordHash, fullName, role = 'laborant' }) {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name, role, created_at`,
    [email, passwordHash, fullName, role]
  );
  return result.rows[0];
}

module.exports = { findByEmail, create };
