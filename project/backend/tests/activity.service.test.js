const activityRepo = require('../src/repositories/activity.repository');
const activityService = require('../src/services/activity.service');

jest.mock('../src/repositories/activity.repository', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  count: jest.fn(),
}));

describe('activity.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('log passes data to repository', async () => {
    activityRepo.create.mockResolvedValue({ id: 1 });

    await activityService.log({
      userId: 1,
      action: 'login',
      entityType: 'user',
      entityId: 1,
      details: 'ok',
    });

    expect(activityRepo.create).toHaveBeenCalledWith({
      userId: 1,
      action: 'login',
      entityType: 'user',
      entityId: 1,
      details: 'ok',
    });
  });

  test('getAll returns logs and total', async () => {
    activityRepo.findAll.mockResolvedValue([{ id: 1 }]);
    activityRepo.count.mockResolvedValue(3);

    const result = await activityService.getAll({ limit: 10, offset: 20 });

    expect(activityRepo.findAll).toHaveBeenCalledWith({ limit: 10, offset: 20 });
    expect(activityRepo.count).toHaveBeenCalled();
    expect(result).toEqual({ logs: [{ id: 1 }], total: 3 });
  });
});
