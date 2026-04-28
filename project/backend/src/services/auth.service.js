const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

const SALT_ROUNDS = 12;

async function register({ email, password, fullName }) {
  if (!email || !password || !fullName) {
    const err = new Error('email, password and fullName are required');
    err.status = 400;
    throw err;
  }
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return userRepo.create({ email, passwordHash, fullName });
}

async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('email and password are required');
    err.status = 400;
    throw err;
  }
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
  return {
    token,
    user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
  };
}

module.exports = { register, login };
