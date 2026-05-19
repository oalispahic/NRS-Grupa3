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

async function findById(id) {
  const { rows } = await pool.query(
    'SELECT id, email, full_name, role, bio, institution, department, phone, degree, created_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function updateProfile(id, { fullName, passwordHash, bio, institution, department, phone, degree }) {
  const { rows } = await pool.query(
    `UPDATE users
     SET full_name     = COALESCE($2, full_name),
         password_hash = COALESCE($3, password_hash),
         bio           = COALESCE($4, bio),
         institution   = COALESCE($5, institution),
         department    = COALESCE($6, department),
         phone         = COALESCE($7, phone),
         degree        = COALESCE($8, degree)
     WHERE id = $1
     RETURNING id, email, full_name, role, bio, institution, department, phone, degree, created_at`,
    [id, fullName || null, passwordHash || null, bio ?? null, institution ?? null, department ?? null, phone ?? null, degree ?? null]
  );
  return rows[0] || null;
}

module.exports = { findByUsername, findById, create, updateProfile };
