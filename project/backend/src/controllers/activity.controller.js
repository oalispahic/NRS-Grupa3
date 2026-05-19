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

module.exports = { getAll };
