const pool = require('../config/db');

/**
 * Pronalazi korisnika na osnovu email adrese.
 * Vraca korisnika ili null ako ne postoji.
 */
async function findByEmail(email) {
  const rezultat = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rezultat.rows[0] || null;
}

/**
 * Kreira novog korisnika u bazi podataka.
 * Podrazumijevana uloga je 'laborant'.
 */
async function create({ email, passwordHash, fullName, role = 'laborant' }) {
  const rezultat = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name, role, created_at`,
    [email, passwordHash, fullName, role]
  );
  return rezultat.rows[0];
}

module.exports = { findByEmail, create };
