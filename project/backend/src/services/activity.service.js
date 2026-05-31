const activityRepo = require('../repositories/activity.repository');

function log({ userId, action, entityType, entityId, details }) {
  return activityRepo.create({ userId, action, entityType, entityId, details }).catch(() => {});
}

async function getAll({ limit, offset } = {}) {
  const [logs, total] = await Promise.all([
    activityRepo.findAll({ limit, offset }),
    activityRepo.count(),
  ]);
  return { logs, total };
}

async function getMine({ userId, limit, offset, type } = {}) {
  const [logs, total] = await Promise.all([
    activityRepo.findByUser({ userId, limit, offset, type }),
    activityRepo.countByUser(userId),
  ]);
  return { logs, total };
}

module.exports = { log, getAll, getMine };
