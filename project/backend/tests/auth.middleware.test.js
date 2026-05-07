const jwt = require('jsonwebtoken');
const { authenticate, requireRole } = require('../src/middleware/auth');

jest.mock('jsonwebtoken');

describe('auth middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('authenticate rejects missing token', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('authenticate rejects invalid token', () => {
    jwt.verify.mockImplementation(() => { throw new Error('bad token'); });
    const req = { headers: { authorization: 'Bearer bad' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('authenticate sets req.user on valid token', () => {
    jwt.verify.mockReturnValue({ id: 1, role: 'admin' });
    const req = { headers: { authorization: 'Bearer good' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(req.user).toEqual({ id: 1, role: 'admin' });
    expect(next).toHaveBeenCalled();
  });

  test('requireRole blocks when role does not match', () => {
    const req = { user: { role: 'laborant' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    requireRole('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('requireRole allows when role matches', () => {
    const req = { user: { role: 'admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    requireRole('admin')(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
