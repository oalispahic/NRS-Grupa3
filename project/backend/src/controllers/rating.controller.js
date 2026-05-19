const ratingService = require('../services/rating.service');

async function add(req, res, next) {
  try {
    const r = await ratingService.addRating({
      userId: req.user.id,
      equipmentId: req.params.id,
      ...req.body,
    });
    res.status(201).json(r);
  } catch (err) {
    next(err);
  }
}

async function getByEquipment(req, res, next) {
  try {
    const data = await ratingService.getEquipmentRatings(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { add, getByEquipment };
