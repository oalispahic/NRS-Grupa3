const notificationService = require('../services/notification.service');

async function getAll(req, res, next) {
  try {
    const data = await notificationService.getUserNotifications(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function markOne(req, res, next) {
  try {
    const n = await notificationService.markRead(req.params.id, req.user.id);
    if (!n) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(n);
  } catch (err) {
    next(err);
  }
}

async function markAll(req, res, next) {
  try {
    await notificationService.markAllRead(req.user.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, markOne, markAll };
