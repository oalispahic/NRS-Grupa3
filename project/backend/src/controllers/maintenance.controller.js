const maintenanceRepo = require('../repositories/maintenance.repository');
const notificationRepo = require('../repositories/notification.repository');
const activityService = require('../services/activity.service');

async function list(req, res, next) {
  try {
    const { status, equipment_id, assigned_to } = req.query;
    const tasks = await maintenanceRepo.findAll({
      statusFilter: status || null,
      equipmentId: equipment_id ? parseInt(equipment_id, 10) : null,
      assignedTo: assigned_to ? parseInt(assigned_to, 10) : null,
    });
    res.json(tasks);
  } catch (err) { next(err); }
}

async function myTasks(req, res, next) {
  try {
    const tasks = await maintenanceRepo.findByAssignee(req.user.id);
    res.json(tasks);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { equipment_id, assigned_to, title, description, priority, due_date } = req.body;
    if (!equipment_id || !title) {
      const err = new Error('equipment_id and title are required');
      err.status = 400;
      return next(err);
    }

    const task = await maintenanceRepo.create({
      equipmentId: parseInt(equipment_id, 10),
      assignedTo: assigned_to ? parseInt(assigned_to, 10) : null,
      createdBy: req.user.id,
      title: title.trim(),
      description: description ? description.trim() : null,
      priority: priority || 'medium',
      dueDate: due_date || null,
    });

    if (assigned_to) {
      await notificationRepo.create({
        userId: parseInt(assigned_to, 10),
        type: 'maintenance_assigned',
        title: 'Novi maintenance zadatak',
        message: `Dodijeljen vam je zadatak: "${task.title}"`,
      }).catch(() => {});
    }

    activityService.log({
      userId: req.user.id,
      action: 'maintenance_task_created',
      entityType: 'maintenance_task',
      entityId: task.id,
      details: `Task: ${task.title}`,
    });

    res.status(201).json(task);
  } catch (err) { next(err); }
}

async function updateStatus(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    const VALID = ['open', 'in_progress', 'completed'];
    if (!VALID.includes(status)) {
      const err = new Error(`Invalid status. Must be one of: ${VALID.join(', ')}`);
      err.status = 400;
      return next(err);
    }

    const task = await maintenanceRepo.findById(id);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    const isAdmin = req.user.role === 'admin' || req.user.role === 'test';
    if (!isAdmin && task.assigned_to !== req.user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const updated = await maintenanceRepo.updateStatus(id, status);
    activityService.log({
      userId: req.user.id,
      action: 'maintenance_task_updated',
      entityType: 'maintenance_task',
      entityId: id,
      details: `Status: ${status}`,
    });
    res.json(updated);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, description, priority, due_date, assigned_to } = req.body;
    const updated = await maintenanceRepo.update(id, {
      title, description, priority,
      dueDate: due_date || null,
      assignedTo: assigned_to ? parseInt(assigned_to, 10) : null,
    });
    if (!updated) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.json(updated);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const deleted = await maintenanceRepo.remove(parseInt(req.params.id, 10));
    if (!deleted) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { list, myTasks, create, updateStatus, update, remove };
