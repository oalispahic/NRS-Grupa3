const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const pool = require('../config/db');

router.use(authenticate, requireRole('admin', 'test'));

router.get('/', async (req, res, next) => {
  try {
    const [kpi, topEquipment, statusDist, weeklyTrend] = await Promise.all([
      pool.query(`
        SELECT
          (SELECT COUNT(*) FROM equipment) AS total_equipment,
          (SELECT COUNT(*) FROM reservations) AS total_reservations,
          (SELECT COUNT(*) FROM users) AS total_users,
          (SELECT ROUND(AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600)::numeric, 1)
           FROM reservations WHERE status = 'approved') AS avg_duration_hours,
          (SELECT ROUND(
            COUNT(*) FILTER (WHERE status = 'approved') * 100.0 / NULLIF(COUNT(*) FILTER (WHERE status IN ('approved','rejected')), 0)
          , 1) FROM reservations) AS approval_rate
      `),
      pool.query(`
        SELECT e.name AS equipment_name, COUNT(r.id) AS reservation_count
        FROM reservations r
        JOIN equipment e ON e.id = r.equipment_id
        GROUP BY e.id, e.name
        ORDER BY reservation_count DESC
        LIMIT 7
      `),
      pool.query(`
        SELECT status, COUNT(*) AS count
        FROM reservations
        GROUP BY status
      `),
      pool.query(`
        SELECT
          DATE_TRUNC('week', created_at) AS week,
          COUNT(*) AS count
        FROM reservations
        WHERE created_at >= NOW() - INTERVAL '12 weeks'
        GROUP BY week
        ORDER BY week ASC
      `),
    ]);

    res.json({
      kpi: kpi.rows[0],
      topEquipment: topEquipment.rows,
      statusDistribution: statusDist.rows,
      weeklyTrend: weeklyTrend.rows,
    });
  } catch (err) { next(err); }
});

module.exports = router;
