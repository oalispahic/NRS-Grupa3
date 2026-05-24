const notificationRepo = require('../repositories/notification.repository');

async function notifyReservationApproved(userId, equipmentName) {
  return notificationRepo.create({
    userId,
    type: 'reservation_approved',
    title: 'Rezervacija odobrena',
    message: `Vaša rezervacija za "${equipmentName}" je odobrena.`,
  });
}

async function notifyReservationRejected(userId, equipmentName, reason) {
  const message = reason
    ? `Vaša rezervacija za "${equipmentName}" je odbijena. Razlog: ${reason}`
    : `Vaša rezervacija za "${equipmentName}" je odbijena.`;
  return notificationRepo.create({
    userId,
    type: 'reservation_rejected',
    title: 'Rezervacija odbijena',
    message,
  });
}

async function getUserNotifications(userId) {
  const [notifications, unread] = await Promise.all([
    notificationRepo.findByUser(userId),
    notificationRepo.countUnread(userId),
  ]);
  return { notifications, unread };
}

async function markRead(id, userId) {
  return notificationRepo.markRead(id, userId);
}

async function markAllRead(userId) {
  return notificationRepo.markAllRead(userId);
}

module.exports = {
  notifyReservationApproved,
  notifyReservationRejected,
  getUserNotifications,
  markRead,
  markAllRead,
};
