const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

const BCRYPT_ROUNDS = 12;

/**
 * Handles new user registration.
 * Validates input, checks for duplicates, hashes password and creates user.
 */
async function registerUser({ email, password, fullName }) {
  if (!email || !password || !fullName) {
    const err = new Error('All fields are required: email, password, fullName');
    err.status = 400;
    throw err;
  }

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    const err = new Error('User with this email already exists');
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const newUser = await userRepo.create({
    email,
    passwordHash: hashedPassword,
    fullName,
  });

  return newUser;
}

/**
 * Handles user login.
 * Verifies credentials and returns a signed JWT token.
 */
async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const foundUser = await userRepo.findByEmail(email);
  if (!foundUser) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const passwordValid = await bcrypt.compare(password, foundUser.password_hash);
  if (!passwordValid) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const tokenPayload = {
    id:    foundUser.id,
    email: foundUser.email,
    role:  foundUser.role,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

  return {
    token,
    user: {
      id:        foundUser.id,
      email:     foundUser.email,
      role:      foundUser.role,
      full_name: foundUser.full_name,
    },
  };
}

module.exports = {
  register: registerUser,
  login:    loginUser,
};
