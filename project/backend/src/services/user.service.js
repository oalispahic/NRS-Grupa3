const bcrypt = require('bcrypt');
const userRepo = require('../repositories/user.repository');

async function getProfile(userId) {
  const user = await userRepo.findById(userId);
  if (!user) {
    const err = new Error('Korisnik nije pronađen');
    err.status = 404;
    throw err;
  }
  return user;
}

async function updateProfile(userId, { fullName, currentPassword, newPassword, bio, institution, department, phone, degree }) {
  const hasInfo    = fullName || bio !== undefined || institution !== undefined || department !== undefined || phone !== undefined || degree !== undefined;
  const hasPwChange = newPassword;
  if (!hasInfo && !hasPwChange) {
    const err = new Error('Nema podataka za ažuriranje');
    err.status = 400;
    throw err;
  }

  let passwordHash = null;

  if (newPassword) {
    if (!currentPassword) {
      const err = new Error('Trenutna lozinka je obavezna za promjenu lozinke');
      err.status = 400;
      throw err;
    }
    const user = await userRepo.findByUsername(
      (await userRepo.findById(userId))?.email
    );
    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      const err = new Error('Trenutna lozinka nije ispravna');
      err.status = 400;
      throw err;
    }
    passwordHash = await bcrypt.hash(newPassword, 12);
  }

  return userRepo.updateProfile(userId, {
    fullName:     fullName     || null,
    passwordHash,
    bio:          bio          !== undefined ? bio          : undefined,
    institution:  institution  !== undefined ? institution  : undefined,
    department:   department   !== undefined ? department   : undefined,
    phone:        phone        !== undefined ? phone        : undefined,
    degree:       degree       !== undefined ? degree       : undefined,
  });
}

module.exports = { getProfile, updateProfile };
