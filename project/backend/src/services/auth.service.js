const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const korisnikRepo = require('../repositories/user.repository');

// Broj rundi za hashiranje lozinke
const BCRYPT_ROUNDS = 12;

/**
 * Registracija novog korisnika u sistem.
 * Provjerava da li su sva polja prisutna i da li email vec postoji.
 */
async function registrujKorisnika({ email, password, fullName }) {
  // Validacija obaveznih polja
  if (!email || !password || !fullName) {
    const greska = new Error('Sva polja su obavezna: email, password, fullName');
    greska.status = 400;
    throw greska;
  }

  // Provjera da li korisnik sa ovim emailom vec postoji
  const postojeciKorisnik = await korisnikRepo.findByEmail(email);
  if (postojeciKorisnik) {
    const greska = new Error('Korisnik sa ovim emailom vec postoji');
    greska.status = 409;
    throw greska;
  }

  // Hashiranje lozinke i kreiranje korisnika
  const hashiranaLozinka = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const noviKorisnik = await korisnikRepo.create({
    email,
    passwordHash: hashiranaLozinka,
    fullName,
  });

  return noviKorisnik;
}

/**
 * Prijava korisnika - provjerava kredencijale i vraca JWT token.
 */
async function prijaviKorisnika({ email, password }) {
  // Validacija inputa
  if (!email || !password) {
    const greska = new Error('Email i lozinka su obavezni');
    greska.status = 400;
    throw greska;
  }

  // Pronalazenje korisnika po emailu
  const korisnik = await korisnikRepo.findByEmail(email);
  if (!korisnik) {
    const greska = new Error('Pogresni pristupni podaci');
    greska.status = 401;
    throw greska;
  }

  // Poredjenje lozinke sa hashom iz baze
  const lozinkaIspravna = await bcrypt.compare(password, korisnik.password_hash);
  if (!lozinkaIspravna) {
    const greska = new Error('Pogresni pristupni podaci');
    greska.status = 401;
    throw greska;
  }

  // Generisanje JWT tokena sa korisnickim podacima
  const payload = {
    id:    korisnik.id,
    email: korisnik.email,
    role:  korisnik.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

  return {
    token,
    user: {
      id:        korisnik.id,
      email:     korisnik.email,
      role:      korisnik.role,
      full_name: korisnik.full_name,
    },
  };
}

module.exports = {
  register: registrujKorisnika,
  login:    prijaviKorisnika,
};
