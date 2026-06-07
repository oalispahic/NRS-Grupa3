const maintenanceRepo = require('../src/repositories/maintenance.repository');
const notificationRepo = require('../src/repositories/notification.repository');
const activityService = require('../src/services/activity.service');
const ctrl = require('../src/controllers/maintenance.controller');

jest.mock('../src/repositories/maintenance.repository', () => ({
  findAll: jest.fn(),
  findByAssignee: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  updateStatus: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('../src/repositories/notification.repository', () => ({
  create: jest.fn().mockResolvedValue({}),
}));

jest.mock('../src/services/activity.service', () => ({
  log: jest.fn(),
}));

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('maintenance.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create rejects missing fields', async () => {
    const req = { body: { title: '' }, user: { id: 1 } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
  });

  test('create sends notification when assigned', async () => {
    maintenanceRepo.create.mockResolvedValue({ id: 5, title: 'Kalibracija' });

    const req = {
      body: { equipment_id: 2, assigned_to: 7, title: 'Kalibracija', description: 'Detalji', priority: 'high', due_date: '2026-06-10' },
      user: { id: 1 },
    };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.create(req, res, next);

    expect(maintenanceRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      equipmentId: 2,
      assignedTo: 7,
      createdBy: 1,
      title: 'Kalibracija',
    }));
    expect(notificationRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      userId: 7,
      type: 'maintenance_assigned',
    }));
    expect(activityService.log).toHaveBeenCalledWith(expect.objectContaining({
      action: 'maintenance_task_created',
      entityType: 'maintenance_task',
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 5 }));
  });

  test('updateStatus rejects invalid status', async () => {
    const req = { params: { id: '3' }, body: { status: 'bad' }, user: { id: 1, role: 'admin' } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.updateStatus(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
  });

  test('updateStatus forbids non-assignee', async () => {
    maintenanceRepo.findById.mockResolvedValue({ id: 3, assigned_to: 2 });

    const req = { params: { id: '3' }, body: { status: 'completed' }, user: { id: 4, role: 'laborant' } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.updateStatus(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }));
  });

  test('updateStatus updates task for assignee', async () => {
    maintenanceRepo.findById.mockResolvedValue({ id: 3, assigned_to: 4 });
    maintenanceRepo.updateStatus.mockResolvedValue({ id: 3, status: 'completed' });

    const req = { params: { id: '3' }, body: { status: 'completed' }, user: { id: 4, role: 'laborant' } };
    const res = mockRes();
    const next = jest.fn();

    await ctrl.updateStatus(req, res, next);

    expect(maintenanceRepo.updateStatus).toHaveBeenCalledWith(3, 'completed');
    expect(activityService.log).toHaveBeenCalledWith(expect.objectContaining({
      action: 'maintenance_task_updated',
      entityType: 'maintenance_task',
    }));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 3, status: 'completed' }));
  });
});
