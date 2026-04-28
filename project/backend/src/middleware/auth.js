const jwt = require('jsonwebtoken');

/**
 * Middleware that verifies the JWT token from Authorization header.
 * Sets req.user with decoded token data if valid.
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token nije proslijedjen' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token je nevazeci ili je istekao' });
  }
}

/**
 * Middleware for role-based access control.
 * Accepts a list of allowed roles and blocks users without matching role.
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Nemate dozvolu za ovu akciju' });
    }
    next();
  };
}

module.exports = { authenticate, requireRole };
