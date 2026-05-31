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

// Reports endpoint — merged here because statistics route is guaranteed to load on Vercel
router.get('/report', async (req, res, next) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      const err = new Error('from and to query parameters are required');
      err.status = 400;
      return next(err);
    }

    const toDate = new Date(to);
    toDate.setDate(toDate.getDate() + 1);
    const toEx = toDate.toISOString().slice(0, 10);

    const [kpi, topEq, trend, statusBd, topUsers] = await Promise.all([
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
           (SELECT ROUND(AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600)::numeric, 1)
            FROM reservations
            WHERE status = 'approved' AND created_at >= $1 AND created_at < $2) AS avg_duration_hours
         FROM reservations
         WHERE created_at >= $1 AND created_at < $2`,
        [from, toEx]
      ),
      pool.query(
        `SELECT e.name AS equipment_name, COUNT(r.id) AS reservation_count
         FROM reservations r
         JOIN equipment e ON e.id = r.equipment_id
         WHERE r.created_at >= $1 AND r.created_at < $2
         GROUP BY e.id, e.name
         ORDER BY reservation_count DESC LIMIT 10`,
        [from, toEx]
      ),
      pool.query(
        `SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count
         FROM reservations
         WHERE created_at >= $1 AND created_at < $2
         GROUP BY 1 ORDER BY 1 ASC`,
        [from, toEx]
      ),
      pool.query(
        `SELECT status, COUNT(*) AS count
         FROM reservations
         WHERE created_at >= $1 AND created_at < $2
         GROUP BY status`,
        [from, toEx]
      ),
      pool.query(
        `SELECT u.full_name, u.email, COUNT(r.id) AS reservation_count
         FROM reservations r
         JOIN users u ON u.id = r.user_id
         WHERE r.created_at >= $1 AND r.created_at < $2
         GROUP BY u.id, u.full_name, u.email
         ORDER BY reservation_count DESC LIMIT 5`,
        [from, toEx]
      ),
    ]);

    res.json({
      kpi: kpi.rows[0],
      topEquipment: topEq.rows,
      trend: trend.rows,
      statusBreakdown: statusBd.rows,
      topUsers: topUsers.rows,
    });
  } catch (err) {
    console.error('[report] error:', err.message, err.stack);
    next(err);
  }
});

// Reports v2 - separate queries, explicit ::date cast to avoid pg type inference issues
router.get('/reportv2', async (req, res, next) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      const err = new Error('from and to required');
      err.status = 400;
      return next(err);
    }
    const f = from; const t = to;

    const [tot, appr, rej, canc, pend, rate, avgD, topEq, trend, statusBd, topU] = await Promise.all([
      pool.query(`SELECT COUNT(*) AS n FROM reservations WHERE created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT COUNT(*) AS n FROM reservations WHERE status='approved' AND created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT COUNT(*) AS n FROM reservations WHERE status='rejected' AND created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT COUNT(*) AS n FROM reservations WHERE status='cancelled' AND created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT COUNT(*) AS n FROM reservations WHERE status='pending' AND created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT ROUND(COUNT(*) FILTER (WHERE status='approved') * 100.0 / NULLIF(COUNT(*) FILTER (WHERE status IN ('approved','rejected')), 0), 1) AS rate FROM reservations WHERE created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT ROUND(AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600)::numeric, 1) AS avg_h FROM reservations WHERE status='approved' AND created_at::date >= $1::date AND created_at::date <= $2::date`, [f, t]),
      pool.query(`SELECT e.name AS equipment_name, COUNT(r.id) AS reservation_count FROM reservations r JOIN equipment e ON e.id = r.equipment_id WHERE r.created_at::date >= $1::date AND r.created_at::date <= $2::date GROUP BY e.id, e.name ORDER BY reservation_count DESC LIMIT 10`, [f, t]),
      pool.query(`SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count FROM reservations WHERE created_at::date >= $1::date AND created_at::date <= $2::date GROUP BY 1 ORDER BY 1`, [f, t]),
      pool.query(`SELECT status, COUNT(*) AS count FROM reservations WHERE created_at::date >= $1::date AND created_at::date <= $2::date GROUP BY status`, [f, t]),
      pool.query(`SELECT u.full_name, u.email, COUNT(r.id) AS reservation_count FROM reservations r JOIN users u ON u.id = r.user_id WHERE r.created_at::date >= $1::date AND r.created_at::date <= $2::date GROUP BY u.id, u.full_name, u.email ORDER BY reservation_count DESC LIMIT 5`, [f, t]),
    ]);

    res.json({
      kpi: { total_reservations: tot.rows[0].n, approved: appr.rows[0].n, rejected: rej.rows[0].n, cancelled: canc.rows[0].n, pending: pend.rows[0].n, approval_rate: rate.rows[0].rate, avg_duration_hours: avgD.rows[0].avg_h },
      topEquipment: topEq.rows,
      trend: trend.rows,
      statusBreakdown: statusBd.rows,
      topUsers: topU.rows,
    });
  } catch (err) {
    console.error('[reportv2] error:', err.message, err.stack);
    next(err);
  }
});

module.exports = router;
