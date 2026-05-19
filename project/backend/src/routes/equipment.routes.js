const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const equipmentController = require('../controllers/equipment.controller');
const reservationRepo = require('../repositories/reservation.repository');
const ratingController = require('../controllers/rating.controller');
const tagController = require('../controllers/tag.controller');

router.get('/', equipmentController.list);

router.get('/:id/reserved-dates', async (req, res, next) => {
  try {
    const ranges = await reservationRepo.findActiveByEquipment(req.params.id);
    res.json(ranges);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/ratings', ratingController.getByEquipment);
router.post('/:id/ratings', authenticate, ratingController.add);

router.get('/:id/tags', tagController.getEquipmentTags);
router.put('/:id/tags', authenticate, requireRole('admin', 'test'), tagController.setEquipmentTags);

router.get('/:id', equipmentController.getOne);
router.post('/', authenticate, requireRole('admin', 'test'), equipmentController.create);
router.put('/:id', authenticate, requireRole('admin', 'test'), equipmentController.update);
router.delete('/:id', authenticate, requireRole('admin', 'test'), equipmentController.remove);

module.exports = router;
