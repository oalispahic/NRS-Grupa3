const waitlistRepo = require('../src/repositories/waitlist.repository');
const ctrl = require('../src/controllers/waitlist.controller');

jest.mock('../src/repositories/waitlist.repository', () => ({
  isOnWaitlist: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  findByEquipment: jest.fn(),
  getUserPosition: jest.fn(),
}));

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('waitlist.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('addToWaitlist rejects duplicate entry', async () => {
    waitlistRepo.isOnWaitlist.mockResolvedValue(true);

    const req = { params: { id: '5' }, user: { id: 9 } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.addToWaitlist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Already on waitlist' });
  });

  test('addToWaitlist creates entry', async () => {
    waitlistRepo.isOnWaitlist.mockResolvedValue(false);
    waitlistRepo.add.mockResolvedValue({ id: 1, equipment_id: 5, user_id: 9 });

    const req = { params: { id: '5' }, user: { id: 9 } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.addToWaitlist(req, res, next);

    expect(waitlistRepo.add).toHaveBeenCalledWith(5, 9);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('getWaitlist returns full list for admin', async () => {
    waitlistRepo.findByEquipment.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const req = { params: { id: '7' }, user: { id: 1, role: 'admin' } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.getWaitlist(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ list: [{ id: 1 }, { id: 2 }], total: 2 });
  });

  test('getWaitlist returns position for user', async () => {
    waitlistRepo.findByEquipment.mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);
    waitlistRepo.getUserPosition.mockResolvedValue(2);
    waitlistRepo.isOnWaitlist.mockResolvedValue(true);

    const req = { params: { id: '7' }, user: { id: 4, role: 'laborant' } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.getWaitlist(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ onList: true, position: 2, total: 3 });
  });

  test('removeFromWaitlist returns 204', async () => {
    waitlistRepo.remove.mockResolvedValue(true);

    const req = { params: { id: '8' }, user: { id: 4 } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.removeFromWaitlist(req, res, next);

    expect(waitlistRepo.remove).toHaveBeenCalledWith(8, 4);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
