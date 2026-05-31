const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/maintenance.controller');
const pool = require('../config/db');

router.get('/mine', authenticate, ctrl.myTasks);

router.get('/upcoming-services', authenticate, requireRole('admin', 'test'), async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const { rows } = await pool.query(
      `SELECT id, name, model, manufacturer, location, location_id,
              planned_service, last_service, status
       FROM equipment
       WHERE planned_service IS NOT NULL
         AND planned_service <= NOW() + ($1 || ' days')::interval
       ORDER BY planned_service ASC
       LIMIT 50`,
      [days]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get('/', authenticate, requireRole('admin', 'test'), ctrl.list);
router.post('/', authenticate, requireRole('admin', 'test'), ctrl.create);
router.put('/:id', authenticate, requireRole('admin', 'test'), ctrl.update);
router.delete('/:id', authenticate, requireRole('admin', 'test'), ctrl.remove);

router.patch('/:id/status', authenticate, ctrl.updateStatus);

module.exports = router;
