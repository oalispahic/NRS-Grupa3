const bcrypt = require('bcrypt');
const userRepo = require('../src/repositories/user.repository');
const userService = require('../src/services/user.service');

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('../src/repositories/user.repository', () => ({
  findById: jest.fn(),
  findByUsername: jest.fn(),
  updateProfile: jest.fn(),
}));

describe('user.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getProfile rejects missing user', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(userService.getProfile(7))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('getProfile returns user', async () => {
    userRepo.findById.mockResolvedValue({ id: 1, email: 'a@b.com' });

    const result = await userService.getProfile(1);

    expect(result).toEqual({ id: 1, email: 'a@b.com' });
  });

  test('updateProfile rejects when no data provided', async () => {
    await expect(userService.updateProfile(1, {}))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('updateProfile rejects password change without current password', async () => {
    await expect(userService.updateProfile(1, { newPassword: 'secret123' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('updateProfile rejects invalid current password', async () => {
    userRepo.findById.mockResolvedValue({ email: 'user@example.com' });
    userRepo.findByUsername.mockResolvedValue({ password_hash: 'hash' });
    bcrypt.compare.mockResolvedValue(false);

    await expect(userService.updateProfile(1, { currentPassword: 'bad', newPassword: 'secret123' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('updateProfile updates info fields', async () => {
    userRepo.updateProfile.mockResolvedValue({ id: 1, full_name: 'Ana' });

    const result = await userService.updateProfile(1, { fullName: 'Ana', bio: 'Bio' });

    expect(userRepo.updateProfile).toHaveBeenCalledWith(1, expect.objectContaining({
      fullName: 'Ana',
      bio: 'Bio',
    }));
    expect(result).toEqual({ id: 1, full_name: 'Ana' });
  });

  test('updateProfile updates password when current password is valid', async () => {
    userRepo.findById.mockResolvedValue({ email: 'user@example.com' });
    userRepo.findByUsername.mockResolvedValue({ password_hash: 'hash' });
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('hashed');
    userRepo.updateProfile.mockResolvedValue({ id: 1, email: 'user@example.com' });

    const result = await userService.updateProfile(1, { currentPassword: 'oldpass', newPassword: 'newpass', fullName: 'Ana' });

    expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 12);
    expect(userRepo.updateProfile).toHaveBeenCalledWith(1, expect.objectContaining({ passwordHash: 'hashed' }));
    expect(result).toEqual({ id: 1, email: 'user@example.com' });
  });
});
