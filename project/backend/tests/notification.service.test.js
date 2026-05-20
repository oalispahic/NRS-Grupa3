const notificationRepo = require('../src/repositories/notification.repository');
const notificationService = require('../src/services/notification.service');

jest.mock('../src/repositories/notification.repository', () => ({
  create: jest.fn(),
  findByUser: jest.fn(),
  countUnread: jest.fn(),
  markRead: jest.fn(),
  markAllRead: jest.fn(),
}));

describe('notification.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('notifyReservationApproved creates notification', async () => {
    notificationRepo.create.mockResolvedValue({ id: 1 });

    await notificationService.notifyReservationApproved(3, 'Microscope A');

    expect(notificationRepo.create).toHaveBeenCalledWith({
      userId: 3,
      type: 'reservation_approved',
      title: 'Rezervacija odobrena',
      message: 'Vaša rezervacija za "Microscope A" je odobrena.',
    });
  });

  test('notifyReservationRejected creates notification', async () => {
    notificationRepo.create.mockResolvedValue({ id: 2 });

    await notificationService.notifyReservationRejected(5, 'Analyzer B');

    expect(notificationRepo.create).toHaveBeenCalledWith({
      userId: 5,
      type: 'reservation_rejected',
      title: 'Rezervacija odbijena',
      message: 'Vaša rezervacija za "Analyzer B" je odbijena.',
    });
  });

  test('getUserNotifications returns notifications and unread count', async () => {
    notificationRepo.findByUser.mockResolvedValue([{ id: 1 }]);
    notificationRepo.countUnread.mockResolvedValue(2);

    const result = await notificationService.getUserNotifications(7);

    expect(notificationRepo.findByUser).toHaveBeenCalledWith(7);
    expect(notificationRepo.countUnread).toHaveBeenCalledWith(7);
    expect(result).toEqual({ notifications: [{ id: 1 }], unread: 2 });
  });

  test('markRead delegates to repository', async () => {
    notificationRepo.markRead.mockResolvedValue({ id: 9 });

    const result = await notificationService.markRead(9, 4);

    expect(notificationRepo.markRead).toHaveBeenCalledWith(9, 4);
    expect(result).toEqual({ id: 9 });
  });

  test('markAllRead delegates to repository', async () => {
    notificationRepo.markAllRead.mockResolvedValue();

    await notificationService.markAllRead(4);

    expect(notificationRepo.markAllRead).toHaveBeenCalledWith(4);
  });
});
