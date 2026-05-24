const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query(
    'SELECT * FROM consumables ORDER BY name ASC'
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM consumables WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create({ name, unit, quantity, low_stock_threshold, notes }) {
  const { rows } = await pool.query(
    `INSERT INTO consumables (name, unit, quantity, low_stock_threshold, notes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, unit || 'kom', quantity || 0, low_stock_threshold || 5, notes || null]
  );
  return rows[0];
}

async function update(id, { name, unit, low_stock_threshold, notes }) {
  const { rows } = await pool.query(
    `UPDATE consumables
     SET name = COALESCE($2, name),
         unit = COALESCE($3, unit),
         low_stock_threshold = COALESCE($4, low_stock_threshold),
         notes = $5,
         updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, name, unit, low_stock_threshold, notes ?? null]
  );
  return rows[0] || null;
}

async function adjustQuantity(id, change, note, userId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: updated } = await client.query(
      `UPDATE consumables SET quantity = quantity + $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, change]
    );
    if (!updated[0]) throw new Error('Consumable not found');
    await client.query(
      `INSERT INTO consumable_logs (consumable_id, change, note, created_by) VALUES ($1, $2, $3, $4)`,
      [id, change, note || null, userId || null]
    );
    await client.query('COMMIT');
    return updated[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function getLogs(consumableId) {
  const { rows } = await pool.query(
    `SELECT cl.*, u.full_name AS user_name
     FROM consumable_logs cl
     LEFT JOIN users u ON u.id = cl.created_by
     WHERE cl.consumable_id = $1
     ORDER BY cl.created_at DESC
     LIMIT 50`,
    [consumableId]
  );
  return rows;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM consumables WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, adjustQuantity, getLogs, remove };
