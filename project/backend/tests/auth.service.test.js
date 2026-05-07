const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../src/repositories/user.repository');
const authService = require('../src/services/auth.service');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/repositories/user.repository', () => ({
  findByUsername: jest.fn(),
  create: jest.fn(),
}));

describe('auth.service', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '8h';
    jest.clearAllMocks();
  });

  test('register rejects missing fields', async () => {
    await expect(authService.register({ username: 'user' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('register rejects duplicate username', async () => {
    userRepo.findByUsername.mockResolvedValue({ id: 1 });

    await expect(authService.register({
      username: 'user',
      password: 'pass',
      fullName: 'Test User',
    })).rejects.toMatchObject({ status: 409 });
  });

  test('register hashes password and creates user', async () => {
    userRepo.findByUsername.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-pass');
    userRepo.create.mockResolvedValue({
      id: 10,
      username: 'user',
      full_name: 'Test User',
      role: 'laborant',
    });

    const result = await authService.register({
      username: 'user',
      password: 'pass',
      fullName: 'Test User',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('pass', 12);
    expect(userRepo.create).toHaveBeenCalledWith({
      username: 'user',
      passwordHash: 'hashed-pass',
      fullName: 'Test User',
    });
    expect(result).toEqual(expect.objectContaining({
      id: 10,
      username: 'user',
    }));
  });

  test('login rejects missing fields', async () => {
    await expect(authService.login({ username: 'user' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('login rejects unknown user', async () => {
    userRepo.findByUsername.mockResolvedValue(null);

    await expect(authService.login({ username: 'user', password: 'pass' }))
      .rejects
      .toMatchObject({ status: 401 });
  });

  test('login rejects invalid password', async () => {
    userRepo.findByUsername.mockResolvedValue({
      id: 2,
      email: 'user@example.com',
      password_hash: 'hashed',
      role: 'laborant',
      full_name: 'Test User',
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login({ username: 'user', password: 'wrong' }))
      .rejects
      .toMatchObject({ status: 401 });
  });

  test('login returns token and user on success', async () => {
    userRepo.findByUsername.mockResolvedValue({
      id: 3,
      email: 'user@example.com',
      password_hash: 'hashed',
      role: 'admin',
      full_name: 'Admin User',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token-123');

    const result = await authService.login({ username: 'user', password: 'pass' });

    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 3,
        username: 'user@example.com',
        role: 'admin',
      }),
      'test-secret',
      { expiresIn: '8h' }
    );
    expect(result).toEqual({
      token: 'token-123',
      user: {
        id: 3,
        username: 'user@example.com',
        role: 'admin',
        full_name: 'Admin User',
      },
    });
  });
});
