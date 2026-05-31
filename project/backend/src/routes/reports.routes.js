const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const pool = require('../config/db');

router.use(authenticate, requireRole('admin', 'test'));

router.get('/', async (req, res, next) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      const err = new Error('from and to query parameters are required');
      err.status = 400;
      return next(err);
    }

    const [kpi, topEquipment, trend, statusBreakdown, topUsers] = await Promise.all([
      pool.query(
        `SELECT
           COUNT(*) AS total_reservations,
           COUNT(*) FILTER (WHERE status = 'approved') AS approved,
           COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,
           COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled,
           COUNT(*) FILTER (WHERE status = 'pending') AS pending,
           ROUND(
             COUNT(*) FILTER (WHERE status = 'approved') * 100.0 /
             NULLIF(COUNT(*) FILTER (WHERE status IN ('approved','rejected')), 0)
           , 1) AS approval_rate,
           ROUND((AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600) FILTER (WHERE status = 'approved'))::numeric, 1) AS avg_duration_hours
         FROM reservations
         WHERE created_at >= $1 AND created_at < ($2::date + INTERVAL '1 day')`,
        [from, to]
      ),
      pool.query(
        `SELECT e.name AS equipment_name, COUNT(r.id) AS reservation_count
         FROM reservations r
         JOIN equipment e ON e.id = r.equipment_id
         WHERE r.created_at >= $1 AND r.created_at < ($2::date + INTERVAL '1 day')
         GROUP BY e.id, e.name
         ORDER BY reservation_count DESC
         LIMIT 10`,
        [from, to]
      ),
      pool.query(
        `SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count
         FROM reservations
         WHERE created_at >= $1 AND created_at < ($2::date + INTERVAL '1 day')
         GROUP BY day
         ORDER BY day ASC`,
        [from, to]
      ),
      pool.query(
        `SELECT status, COUNT(*) AS count
         FROM reservations
         WHERE created_at >= $1 AND created_at < ($2::date + INTERVAL '1 day')
         GROUP BY status`,
        [from, to]
      ),
      pool.query(
        `SELECT u.full_name, u.email, COUNT(r.id) AS reservation_count
         FROM reservations r
         JOIN users u ON u.id = r.user_id
         WHERE r.created_at >= $1 AND r.created_at < ($2::date + INTERVAL '1 day')
         GROUP BY u.id, u.full_name, u.email
         ORDER BY reservation_count DESC
         LIMIT 5`,
        [from, to]
      ),
    ]);

    res.json({
      kpi: kpi.rows[0],
      topEquipment: topEquipment.rows,
      trend: trend.rows,
      statusBreakdown: statusBreakdown.rows,
      topUsers: topUsers.rows,
    });
  } catch (err) { next(err); }
});

module.exports = router;
