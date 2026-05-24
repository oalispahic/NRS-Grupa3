const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const settingsRepo = require('../repositories/settings.repository');

router.get('/', async (req, res, next) => {
  try { res.json(await settingsRepo.getAll()); } catch (err) { next(err); }
});

router.put('/', authenticate, requireRole('admin', 'test'), async (req, res, next) => {
  try {
    const { max_reservation_days, max_advance_days, max_active_reservations } = req.body;
    const updates = [];
    if (max_reservation_days !== undefined) updates.push(settingsRepo.set('max_reservation_days', max_reservation_days));
    if (max_advance_days !== undefined) updates.push(settingsRepo.set('max_advance_days', max_advance_days));
    if (max_active_reservations !== undefined) updates.push(settingsRepo.set('max_active_reservations', max_active_reservations));
    await Promise.all(updates);
    res.json(await settingsRepo.getAll());
  } catch (err) { next(err); }
});

module.exports = router;
