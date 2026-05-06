const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

const BCRYPT_ROUNDS = 12;

async function registerUser({ username, password, fullName }) {
  if (!username || !password || !fullName) {
    const err = new Error('Sva polja su obavezna: korisnicko ime, lozinka, ime i prezime');
    err.status = 400;
    throw err;
  }

  const existingUser = await userRepo.findByUsername(username);
  if (existingUser) {
    const err = new Error('Korisnik sa ovim korisnickim imenom vec postoji');
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const newUser = await userRepo.create({
    username,
    passwordHash: hashedPassword,
    fullName,
  });

  return newUser;
}

async function loginUser({ username, password }) {
  if (!username || !password) {
    const err = new Error('Korisnicko ime i lozinka su obavezni');
    err.status = 400;
    throw err;
  }

  const foundUser = await userRepo.findByUsername(username);
  if (!foundUser) {
    const err = new Error('Pogresni pristupni podaci');
    err.status = 401;
    throw err;
  }

  const passwordValid = await bcrypt.compare(password, foundUser.password_hash);
  if (!passwordValid) {
    const err = new Error('Pogresni pristupni podaci');
    err.status = 401;
    throw err;
  }

  const tokenPayload = {
    id:       foundUser.id,
    username: foundUser.email,
    role:     foundUser.role,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

  return {
    token,
    user: {
      id:        foundUser.id,
      username:  foundUser.email,
      role:      foundUser.role,
      full_name: foundUser.full_name,
    },
  };
}

module.exports = {
  register: registerUser,
  login:    loginUser,
};
