const reservationRepo = require('../src/repositories/reservation.repository');
const equipmentRepo = require('../src/repositories/equipment.repository');
const reservationService = require('../src/services/reservation.service');

jest.mock('../src/repositories/reservation.repository', () => ({
  findConflict: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  updateStatus: jest.fn(),
}));

jest.mock('../src/repositories/equipment.repository', () => ({
  findById: jest.fn(),
}));

describe('reservation.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test('createReservation creates reservation when valid', async () => {
    equipmentRepo.findById.mockResolvedValue({ id: 2 });
    reservationRepo.findConflict.mockResolvedValue(null);
    reservationRepo.create.mockResolvedValue({ id: 5, status: 'pending' });

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
    expect(result).toEqual({ id: 5, status: 'pending' });
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
    reservationRepo.updateStatus.mockResolvedValue({ id: 2, status: 'rejected' });

    const result = await reservationService.rejectReservation(2);

    expect(reservationRepo.updateStatus).toHaveBeenCalledWith(2, 'rejected');
    expect(result).toEqual({ id: 2, status: 'rejected' });
  });
});
