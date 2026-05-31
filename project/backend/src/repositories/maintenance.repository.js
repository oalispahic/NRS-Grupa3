const pool = require('../config/db');

async function create({ equipmentId, assignedTo, createdBy, title, description, priority, dueDate }) {
  const { rows } = await pool.query(
    `INSERT INTO maintenance_tasks (equipment_id, assigned_to, created_by, title, description, priority, due_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [equipmentId, assignedTo || null, createdBy, title, description || null, priority || 'medium', dueDate || null]
  );
  return rows[0];
}

async function findAll({ statusFilter, equipmentId, assignedTo } = {}) {
  const conditions = [];
  const params = [];
  let i = 1;

  if (statusFilter) { conditions.push(`mt.status = $${i++}`); params.push(statusFilter); }
  if (equipmentId) { conditions.push(`mt.equipment_id = $${i++}`); params.push(equipmentId); }
  if (assignedTo) { conditions.push(`mt.assigned_to = $${i++}`); params.push(assignedTo); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `SELECT mt.*,
       e.name AS equipment_name,
       u.full_name AS assigned_to_name,
       u.email AS assigned_to_email,
       cb.full_name AS created_by_name
     FROM maintenance_tasks mt
     JOIN equipment e ON e.id = mt.equipment_id
     LEFT JOIN users u ON u.id = mt.assigned_to
     LEFT JOIN users cb ON cb.id = mt.created_by
     ${where}
     ORDER BY
       CASE mt.priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END,
       mt.due_date ASC NULLS LAST,
       mt.created_at DESC`,
    params
  );
  return rows;
}

async function findByAssignee(userId) {
  return findAll({ assignedTo: userId });
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT mt.*,
       e.name AS equipment_name,
       u.full_name AS assigned_to_name,
       cb.full_name AS created_by_name
     FROM maintenance_tasks mt
     JOIN equipment e ON e.id = mt.equipment_id
     LEFT JOIN users u ON u.id = mt.assigned_to
     LEFT JOIN users cb ON cb.id = mt.created_by
     WHERE mt.id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function updateStatus(id, status) {
  const completedAt = status === 'completed' ? 'NOW()' : 'NULL';
  const { rows } = await pool.query(
    `UPDATE maintenance_tasks
     SET status = $2, completed_at = ${completedAt}, updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, status]
  );
  return rows[0] || null;
}

async function update(id, { title, description, priority, dueDate, assignedTo }) {
  const { rows } = await pool.query(
    `UPDATE maintenance_tasks
     SET title = COALESCE($2, title),
         description = COALESCE($3, description),
         priority = COALESCE($4, priority),
         due_date = $5,
         assigned_to = $6,
         updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, title, description, priority, dueDate || null, assignedTo || null]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query(`DELETE FROM maintenance_tasks WHERE id = $1`, [id]);
  return rowCount > 0;
}

module.exports = { create, findAll, findByAssignee, findById, updateStatus, update, remove };
