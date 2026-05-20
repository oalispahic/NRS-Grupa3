const ratingRepo = require('../src/repositories/rating.repository');
const reservationRepo = require('../src/repositories/reservation.repository');
const equipmentRepo = require('../src/repositories/equipment.repository');
const ratingService = require('../src/services/rating.service');
const activityService = require('../src/services/activity.service');

jest.mock('../src/repositories/rating.repository', () => ({
  create: jest.fn(),
  findByReservation: jest.fn(),
  findByEquipment: jest.fn(),
  getAverage: jest.fn(),
}));

jest.mock('../src/repositories/reservation.repository', () => ({
  findByIdAndUser: jest.fn(),
}));

jest.mock('../src/repositories/equipment.repository', () => ({
  findById: jest.fn(),
}));

jest.mock('../src/services/activity.service', () => ({
  log: jest.fn().mockResolvedValue(),
}));

describe('rating.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('addRating rejects invalid rating', async () => {
    await expect(ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 6,
    })).rejects.toMatchObject({ status: 400 });
  });

  test('addRating rejects missing reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue(null);

    await expect(ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 4,
    })).rejects.toMatchObject({ status: 404 });
  });

  test('addRating rejects non-approved reservation', async () => {
    reservationRepo.findByIdAndUser.mockResolvedValue({
      id: 3,
      status: 'pending',
      end_time: '2024-01-01T10:00:00Z',
    });

    await expect(ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 4,
    })).rejects.toMatchObject({ status: 400 });
  });

  test('addRating rejects before reservation ends', async () => {
    const future = new Date(Date.now() + 3600000).toISOString();
    reservationRepo.findByIdAndUser.mockResolvedValue({
      id: 3,
      status: 'approved',
      end_time: future,
    });

    await expect(ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 4,
    })).rejects.toMatchObject({ status: 400 });
  });

  test('addRating rejects duplicate rating', async () => {
    const past = new Date(Date.now() - 86400000).toISOString();
    reservationRepo.findByIdAndUser.mockResolvedValue({
      id: 3,
      status: 'approved',
      end_time: past,
    });
    ratingRepo.findByReservation.mockResolvedValue({ id: 11 });

    await expect(ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 4,
    })).rejects.toMatchObject({ status: 409 });
  });

  test('addRating creates rating and logs activity', async () => {
    const past = new Date(Date.now() - 86400000).toISOString();
    reservationRepo.findByIdAndUser.mockResolvedValue({
      id: 3,
      status: 'approved',
      end_time: past,
    });
    ratingRepo.findByReservation.mockResolvedValue(null);
    ratingRepo.create.mockResolvedValue({ id: 55, rating: 5 });
    equipmentRepo.findById.mockResolvedValue({ id: 2, name: 'Microscope A' });

    const result = await ratingService.addRating({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 5,
      comment: 'Odlicno',
    });

    expect(ratingRepo.create).toHaveBeenCalledWith({
      userId: 1,
      equipmentId: 2,
      reservationId: 3,
      rating: 5,
      comment: 'Odlicno',
    });
    expect(activityService.log).toHaveBeenCalled();
    expect(result).toEqual({ id: 55, rating: 5 });
  });

  test('getEquipmentRatings returns list and summary', async () => {
    ratingRepo.findByEquipment.mockResolvedValue([{ id: 1 }]);
    ratingRepo.getAverage.mockResolvedValue({ avg: 4.5, total: 2 });

    const result = await ratingService.getEquipmentRatings(9);

    expect(result).toEqual({ ratings: [{ id: 1 }], summary: { avg: 4.5, total: 2 } });
  });
});
