const waitlistRepo = require('../repositories/waitlist.repository');
const notificationRepo = require('../repositories/notification.repository');
const pool = require('../config/db');

async function addToWaitlist(req, res, next) {
  try {
    const equipmentId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const already = await waitlistRepo.isOnWaitlist(equipmentId, userId);
    if (already) {
      return res.status(409).json({ error: 'Already on waitlist' });
    }

    const entry = await waitlistRepo.add(equipmentId, userId);
    if (!entry) {
      return res.status(409).json({ error: 'Already on waitlist' });
    }

    res.status(201).json(entry);
  } catch (err) { next(err); }
}

async function removeFromWaitlist(req, res, next) {
  try {
    const equipmentId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    await waitlistRepo.remove(equipmentId, userId);
    res.status(204).send();
  } catch (err) { next(err); }
}

async function getWaitlist(req, res, next) {
  try {
    const equipmentId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'test';

    const list = await waitlistRepo.findByEquipment(equipmentId);
    const total = list.length;

    if (isAdmin) {
      return res.json({ list, total });
    }

    const position = await waitlistRepo.getUserPosition(equipmentId, userId);
    const onList = await waitlistRepo.isOnWaitlist(equipmentId, userId);
    res.json({ onList, position, total });
  } catch (err) { next(err); }
}

module.exports = { addToWaitlist, removeFromWaitlist, getWaitlist };
