const activityService = require('../services/activity.service');

async function getAll(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 200);
    const offset = parseInt(req.query.offset) || 0;
    const data = await activityService.getAll({ limit, offset });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getMine(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const type = req.query.type || null;
    const data = await activityService.getMine({ userId: req.user.id, limit, offset, type });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getMine };
