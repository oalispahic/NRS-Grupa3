const jwt = require('jsonwebtoken');

/**
 * Middleware koji provjerava da li korisnik ima validan JWT token.
 * Ako je token ispravan, postavlja req.user sa dekodiranim podacima.
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  // Provjera da li Authorization header postoji i pocinje sa 'Bearer '
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token nije proslijedjen' });
  }

  // Izdvajanje tokena iz headera
  const token = header.split(' ')[1];

  try {
    // Verifikacija tokena i postavljanje korisnickih podataka na request
    const dekodiraniPodaci = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dekodiraniPodaci;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token je nevazeci ili je istekao' });
  }
}

/**
 * Middleware za provjeru korisnicke uloge.
 * Prima listu dozvoljenih uloga i propusta samo korisnike sa odgovarajucom ulogom.
 */
function requireRole(...dozvoljeneUloge) {
  return (req, res, next) => {
    const korisnickaUloga = req.user?.role;

    if (!dozvoljeneUloge.includes(korisnickaUloga)) {
      return res.status(403).json({ error: 'Nemate dozvolu za ovu akciju' });
    }

    next();
  };
}

module.exports = { authenticate, requireRole };
