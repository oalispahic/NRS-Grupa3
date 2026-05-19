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

module.exports = { log, getAll };
