const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const pool = require('../config/db');

// User: get own conversation with admins
router.get('/inbox', authenticate, async (req, res, next) => {
  try {
    const uid = req.user.id;
    const { rows } = await pool.query(
      `SELECT m.id, m.sender_id, m.recipient_user_id, m.body, m.equipment_id, m.created_at, m.read_at,
              u.full_name AS sender_name, u.role AS sender_role,
              e.name AS equipment_name
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       LEFT JOIN equipment e ON e.id = m.equipment_id
       WHERE m.sender_id = $1 OR m.recipient_user_id = $1
       ORDER BY m.created_at ASC`,
      [uid]
    );
    // Mark admin replies to this user as read
    await pool.query(
      `UPDATE messages SET read_at = NOW() WHERE recipient_user_id = $1 AND read_at IS NULL`,
      [uid]
    );
    res.json({ messages: rows });
  } catch (err) { next(err); }
});

// Unread message + broadcast count badge
router.get('/unread-count', authenticate, async (req, res, next) => {
  try {
    const uid = req.user.id;
    const isAdmin = ['admin', 'test'].includes(req.user.role);

    if (isAdmin) {
      const { rows } = await pool.query(
        `SELECT COUNT(*) AS count FROM messages WHERE recipient_user_id IS NULL AND read_at IS NULL`
      );
      return res.json({ count: parseInt(rows[0].count) });
    }

    const { rows: msgRows } = await pool.query(
      `SELECT COUNT(*) AS count FROM messages WHERE recipient_user_id = $1 AND read_at IS NULL`,
      [uid]
    );
    const { rows: bcRows } = await pool.query(
      `SELECT COUNT(*) AS count FROM broadcasts b
       WHERE NOT EXISTS (
         SELECT 1 FROM broadcast_reads br WHERE br.broadcast_id = b.id AND br.user_id = $1
       )`,
      [uid]
    );
    res.json({ count: parseInt(msgRows[0].count) + parseInt(bcRows[0].count) });
  } catch (err) { next(err); }
});

// Send message
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { body, equipment_id, recipient_user_id } = req.body;
    if (!body?.trim()) {
      const e = new Error('Poruka ne može biti prazna');
      e.status = 400;
      return next(e);
    }

    const isAdmin = ['admin', 'test'].includes(req.user.role);
    const rid = isAdmin ? (parseInt(recipient_user_id) || null) : null;

    const { rows } = await pool.query(
      `INSERT INTO messages (sender_id, recipient_user_id, body, equipment_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, rid, body.trim(), equipment_id || null]
    );

    // Notify recipient
    if (isAdmin && rid) {
      await pool.query(
        `INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)`,
        [rid, 'Nova poruka od administratora', body.trim().slice(0, 120), 'message_received']
      );
    } else if (!isAdmin) {
      const { rows: admins } = await pool.query(
        `SELECT id FROM users WHERE role IN ('admin', 'test') AND is_active = true`
      );
      for (const admin of admins) {
        await pool.query(
          `INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)`,
          [admin.id, `Nova poruka od ${req.user.full_name}`, body.trim().slice(0, 120), 'message_received']
        );
      }
    }

    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// Admin: list all user conversations
router.get('/conversations', authenticate, requireRole('admin', 'test'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.id, u.full_name, u.email, u.role,
              (SELECT m2.body FROM messages m2
               WHERE m2.sender_id = u.id OR m2.recipient_user_id = u.id
               ORDER BY m2.created_at DESC LIMIT 1) AS last_message,
              (SELECT m2.created_at FROM messages m2
               WHERE m2.sender_id = u.id OR m2.recipient_user_id = u.id
               ORDER BY m2.created_at DESC LIMIT 1) AS last_at,
              (SELECT COUNT(*) FROM messages m3
               WHERE m3.sender_id = u.id AND m3.recipient_user_id IS NULL AND m3.read_at IS NULL)::int AS unread_count
       FROM users u
       WHERE u.role NOT IN ('admin', 'test')
         AND EXISTS (
           SELECT 1 FROM messages WHERE sender_id = u.id OR recipient_user_id = u.id
         )
       ORDER BY last_at DESC NULLS LAST`
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// Admin: get conversation with specific user + mark as read
router.get('/conversation/:userId', authenticate, requireRole('admin', 'test'), async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const { rows } = await pool.query(
      `SELECT m.id, m.sender_id, m.recipient_user_id, m.body, m.equipment_id, m.created_at, m.read_at,
              u.full_name AS sender_name, u.role AS sender_role,
              e.name AS equipment_name
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       LEFT JOIN equipment e ON e.id = m.equipment_id
       WHERE m.sender_id = $1 OR m.recipient_user_id = $1
       ORDER BY m.created_at ASC`,
      [userId]
    );
    await pool.query(
      `UPDATE messages SET read_at = NOW()
       WHERE sender_id = $1 AND recipient_user_id IS NULL AND read_at IS NULL`,
      [userId]
    );
    res.json({ messages: rows });
  } catch (err) { next(err); }
});

// Broadcasts — list for current user (or all if admin)
router.get('/broadcasts', authenticate, async (req, res, next) => {
  try {
    const uid = req.user.id;
    const { rows } = await pool.query(
      `SELECT b.id, b.title, b.body, b.created_at, u.full_name AS sender_name,
              CASE WHEN br.user_id IS NOT NULL THEN true ELSE false END AS is_read
       FROM broadcasts b
       JOIN users u ON u.id = b.sender_id
       LEFT JOIN broadcast_reads br ON br.broadcast_id = b.id AND br.user_id = $1
       ORDER BY b.created_at DESC`,
      [uid]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// Broadcasts — create (admin)
router.post('/broadcasts', authenticate, requireRole('admin', 'test'), async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title?.trim() || !body?.trim()) {
      const e = new Error('Naslov i tekst su obavezni');
      e.status = 400;
      return next(e);
    }
    const { rows } = await pool.query(
      `INSERT INTO broadcasts (sender_id, title, body) VALUES ($1, $2, $3) RETURNING *`,
      [req.user.id, title.trim(), body.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// Broadcasts — mark as read
router.post('/broadcasts/:id/read', authenticate, async (req, res, next) => {
  try {
    await pool.query(
      `INSERT INTO broadcast_reads (broadcast_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [parseInt(req.params.id), req.user.id]
    );
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
