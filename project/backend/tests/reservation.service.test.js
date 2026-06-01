const reservationRepo = require('../src/repositories/reservation.repository');
const equipmentRepo = require('../src/repositories/equipment.repository');
const reservationService = require('../src/services/reservation.service');
const settingsRepo = require('../src/repositories/settings.repository');
const notificationService = require('../src/services/notification.service');

jest.mock('../src/repositories/reservation.repository', () => ({
  findConflict: jest.fn(),
  findConflictExcluding: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  findByIdAndUser: jest.fn(),
  updateStatus: jest.fn(),
  updateDates: jest.fn(),
  countActive: jest.fn(),
  countActiveByUser: jest.fn(),
  returnEarly: jest.fn(),
  findCurrentlyActive: jest.fn(),
}));

jest.mock('../src/repositories/equipment.repository', () => ({
  findById: jest.fn(),
  update: jest.fn(),
}));

jest.mock('../src/services/notification.service', () => ({
  notifyReservationApproved: jest.fn().mockResolvedValue(),
  notifyReservationRejected: jest.fn().mockResolvedValue(),
}));

jest.mock('../src/services/activity.service', () => ({
  log: jest.fn().mockResolvedValue(),
}));

jest.mock('../src/repositories/settings.repository', () => ({
  get: jest.fn(),
}));

describe('reservation.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    settingsRepo.get.mockImplementation((key) => {
      const defaults = {
        max_reservation_days: '30',
        max_advance_days: '90',
        max_active_reservations: '5',
      };
      return Promise.resolve(defaults[key]);
    });
    reservationRepo.countActiveByUser.mockResolvedValue(0);
  });

  test('createReservation rejects missing fields', async () => {
    await expect(reservationService.createReservation({ userId: 1 }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('createReservation rejects end before start', async () => {
    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T12:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    })).rejects.toMatchObject({ status: 400 });
  });

  test('createReservation rejects when equipment not found', async () => {
    equipmentRepo.findById.mockResolvedValue(null);

    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    })).rejects.toMatchObject({ status: 404 });
  });

  test('createReservation rejects on conflict', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2 });
    reservationRepo.findConflict.mockResolvedValue({ id: 9 });

    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    })).rejects.toMatchObject({ status: 409 });
  });

  test('createReservation rejects when duration exceeds max days', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2 });
    reservationRepo.findConflict.mockResolvedValue(null);
    settingsRepo.get.mockImplementation((key) => {
      if (key === 'max_reservation_days') return Promise.resolve('1');
      if (key === 'max_advance_days') return Promise.resolve('90');
      if (key === 'max_active_reservations') return Promise.resolve('5');
      return Promise.resolve(null);
    });

    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T00:00:00Z',
      endTime: '2025-01-03T00:00:00Z',
    })).rejects.toMatchObject({ status: 400 });
  });

  test('createReservation rejects when booking too far in advance', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2 });
    reservationRepo.findConflict.mockResolvedValue(null);
    settingsRepo.get.mockImplementation((key) => {
      if (key === 'max_reservation_days') return Promise.resolve('30');
      if (key === 'max_advance_days') return Promise.resolve('1');
      if (key === 'max_active_reservations') return Promise.resolve('5');
      return Promise.resolve(null);
    });

    const startTime = new Date(Date.now() + 5 * 24 * 3600000).toISOString();
    const endTime = new Date(Date.now() + 6 * 24 * 3600000).toISOString();

    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime,
      endTime,
    })).rejects.toMatchObject({ status: 400 });
  });

  test('createReservation rejects when max active reservations reached', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2 });
    reservationRepo.findConflict.mockResolvedValue(null);
    reservationRepo.countActiveByUser.mockResolvedValue(1);
    settingsRepo.get.mockImplementation((key) => {
      if (key === 'max_reservation_days') return Promise.resolve('30');
      if (key === 'max_advance_days') return Promise.resolve('90');
      if (key === 'max_active_reservations') return Promise.resolve('1');
      return Promise.resolve(null);
    });

    await expect(reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    })).rejects.toMatchObject({ status: 400 });
  });

  test('createReservation creates reservation when valid', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2, status: 'available' });
    reservationRepo.findConflict.mockResolvedValue(null);
    reservationRepo.create.mockResolvedValue({ id: 5, status: 'pending' });
    equipmentRepo.update.mockResolvedValue({ id: 2, status: 'reserved' });

    const result = await reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    });

    expect(reservationRepo.create).toHaveBeenCalledWith({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    });
    expect(equipmentRepo.update).toHaveBeenCalledWith(2, { status: 'reserved' });
    expect(result).toEqual({ id: 5, status: 'pending' });
  });

  test('createReservation allows waitlist when conflicts exist', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2, status: 'reserved' });
    reservationRepo.findConflict.mockResolvedValue({ id: 9 });
    reservationRepo.create.mockResolvedValue({ id: 12, status: 'pending' });

    const result = await reservationService.createReservation({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
      waitlist: true,
    });

    expect(reservationRepo.findConflict).not.toHaveBeenCalled();
    expect(reservationRepo.create).toHaveBeenCalledWith({
      userId: 1,
      equipmentId: 2,
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    });
    expect(result).toEqual({ id: 12, status: 'pending' });
  });

  test('getMyReservations returns user reservations', async () => {
    reservationRepo.findByUserId.mockResolvedValue([{ id: 1 }]);

    const result = await reservationService.getMyReservations(1);

    expect(result).toEqual([{ id: 1 }]);
  });

  test('getAllReservations passes status to repository', async () => {
    reservationRepo.findAll.mockResolvedValue([{ id: 2 }]);

    const result = await reservationService.getAllReservations('pending');

    expect(reservationRepo.findAll).toHaveBeenCalledWith('pending');
    expect(result).toEqual([{ id: 2 }]);
  });

  test('approveReservation rejects missing reservation', async () => {
    reservationRepo.updateStatus.mockResolvedValue(null);

    await expect(reservationService.approveReservation(1))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('approveReservation updates status', async () => {
    reservationRepo.updateStatus.mockResolvedValue({ id: 1, status: 'approved' });

    const result = await reservationService.approveReservation(1);

    expect(reservationRepo.updateStatus).toHaveBeenCalledWith(1, 'approved');
    expect(result).toEqual({ id: 1, status: 'approved' });
  });

  test('rejectReservation rejects missing reservation', async () => {
    reservationRepo.updateStatus.mockResolvedValue(null);

    await expect(reservationService.rejectReservation(1))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('rejectReservation updates status', async () => {
    reservationRepo.updateStatus.mockResolvedValue({ id: 2, status: 'rejected', equipment_id: 10, user_id: 4 });
    reservationRepo.countActive.mockResolvedValue(0);
    equipmentRepo.findById.mockResolvedValue({ id: 10, status: 'reserved', name: 'Microscope A' });
    equipmentRepo.update.mockResolvedValue({ id: 10, status: 'available' });

    const result = await reservationService.rejectReservation(2, 9, 'Nedovoljna dokumentacija');

    expect(reservationRepo.updateStatus).toHaveBeenCalledWith(2, 'rejected', 'Nedovoljna dokumentacija');
    expect(equipmentRepo.update).toHaveBeenCalledWith(10, { status: 'available' });
    expect(notificationService.notifyReservationRejected)
      .toHaveBeenCalledWith(4, 'Microscope A', 'Nedovoljna dokumentacija');
    expect(result).toEqual(expect.objectContaining({ id: 2, status: 'rejected' }));
  });

  test('cancelReservation rejects missing reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue(null);

    await expect(reservationService.cancelReservation(1, 9))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('cancelReservation rejects already canceled reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({ id: 1, status: 'rejected' });

    await expect(reservationService.cancelReservation(1, 9))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('cancelReservation updates status and equipment when no active reservations remain', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({ id: 3, status: 'approved' });
    reservationRepo.updateStatus.mockResolvedValue({ id: 3, status: 'rejected', equipment_id: 7 });
    reservationRepo.countActive.mockResolvedValue(0);
    equipmentRepo.findById.mockResolvedValue({ id: 7, status: 'reserved' });
    equipmentRepo.update.mockResolvedValue({ id: 7, status: 'available' });

    const result = await reservationService.cancelReservation(3, 2);

    expect(reservationRepo.updateStatus).toHaveBeenCalledWith(3, 'rejected');
    expect(equipmentRepo.update).toHaveBeenCalledWith(7, { status: 'available' });
    expect(result).toEqual({ id: 3, status: 'rejected', equipment_id: 7 });
  });

  test('updateReservationDates rejects missing dates', async () => {
    await expect(reservationService.updateReservationDates(1, 2, null, null))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('updateReservationDates rejects end before start', async () => {
    await expect(reservationService.updateReservationDates(
      1, 2, '2025-01-02T10:00:00Z', '2025-01-02T09:00:00Z'
    )).rejects.toMatchObject({ status: 400 });
  });

  test('updateReservationDates rejects missing reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue(null);

    await expect(reservationService.updateReservationDates(
      1, 2, '2025-01-02T10:00:00Z', '2025-01-02T11:00:00Z'
    )).rejects.toMatchObject({ status: 404 });
  });

  test('updateReservationDates rejects canceled reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({ id: 1, status: 'rejected' });

    await expect(reservationService.updateReservationDates(
      1, 2, '2025-01-02T10:00:00Z', '2025-01-02T11:00:00Z'
    )).rejects.toMatchObject({ status: 400 });
  });

  test('updateReservationDates rejects on conflict', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({ id: 1, status: 'pending', equipment_id: 4 });
    reservationRepo.findConflictExcluding.mockResolvedValue({ id: 9 });

    await expect(reservationService.updateReservationDates(
      1, 2, '2025-01-02T10:00:00Z', '2025-01-02T11:00:00Z'
    )).rejects.toMatchObject({ status: 409 });
  });

  test('updateReservationDates updates reservation dates', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({ id: 1, status: 'approved', equipment_id: 4 });
    reservationRepo.findConflictExcluding.mockResolvedValue(null);
    reservationRepo.updateDates.mockResolvedValue({ id: 1, status: 'pending' });

    const result = await reservationService.updateReservationDates(
      1, 2, '2025-01-02T10:00:00Z', '2025-01-02T11:00:00Z'
    );

    expect(reservationRepo.updateDates).toHaveBeenCalledWith(
      1, '2025-01-02T10:00:00Z', '2025-01-02T11:00:00Z'
    );
    expect(result).toEqual({ id: 1, status: 'pending' });
  });

  test('returnReservation rejects missing active reservation', async () => {
    reservationRepo.returnEarly.mockResolvedValue(null);

    await expect(reservationService.returnReservation(3, 2))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('returnReservation updates equipment when no active reservations remain', async () => {
    reservationRepo.returnEarly.mockResolvedValue({ id: 3, equipment_id: 7 });
    equipmentRepo.findById.mockResolvedValue({ id: 7, status: 'reserved' });
    reservationRepo.countActive.mockResolvedValue(0);
    equipmentRepo.update.mockResolvedValue({ id: 7, status: 'available' });

    const result = await reservationService.returnReservation(3, 2);

    expect(equipmentRepo.update).toHaveBeenCalledWith(7, { status: 'available' });
    expect(result).toEqual({ id: 3, equipment_id: 7 });
  });

  test('getCurrentlyActive returns active reservations', async () => {
    reservationRepo.findCurrentlyActive.mockResolvedValue([{ id: 1 }]);

    const result = await reservationService.getCurrentlyActive();

    expect(reservationRepo.findCurrentlyActive).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1 }]);
  });
});
