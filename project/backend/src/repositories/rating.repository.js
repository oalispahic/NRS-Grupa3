const pool = require('../config/db');

async function create({ userId, equipmentId, reservationId, rating, comment }) {
  const { rows } = await pool.query(
    `INSERT INTO equipment_ratings (user_id, equipment_id, reservation_id, rating, comment)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, equipmentId, reservationId, rating, comment || null]
  );
  return rows[0];
}

async function findByEquipment(equipmentId) {
  const { rows } = await pool.query(
    `SELECT er.*, u.full_name
     FROM equipment_ratings er
     JOIN users u ON u.id = er.user_id
     WHERE er.equipment_id = $1
     ORDER BY er.created_at DESC`,
    [equipmentId]
  );
  return rows;
}

async function findByReservation(reservationId) {
  const { rows } = await pool.query(
    'SELECT * FROM equipment_ratings WHERE reservation_id = $1',
    [reservationId]
  );
  return rows[0] || null;
}

async function getAverage(equipmentId) {
  const { rows } = await pool.query(
    `SELECT ROUND(AVG(rating)::numeric, 1) AS avg, COUNT(*) AS total
     FROM equipment_ratings WHERE equipment_id = $1`,
    [equipmentId]
  );
  return { avg: parseFloat(rows[0].avg) || null, total: parseInt(rows[0].total, 10) };
}

module.exports = { create, findByEquipment, findByReservation, getAverage };
