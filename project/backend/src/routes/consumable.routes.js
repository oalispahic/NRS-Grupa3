const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const repo = require('../repositories/consumable.repository');

router.use(authenticate, requireRole('admin', 'test'));

router.get('/', async (req, res, next) => {
  try { res.json(await repo.findAll()); } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, unit, quantity, low_stock_threshold, notes } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Naziv je obavezan' });
    res.status(201).json(await repo.create({ name: name.trim(), unit, quantity, low_stock_threshold, notes }));
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const c = await repo.update(req.params.id, req.body);
    if (!c) return res.status(404).json({ error: 'Nije pronađeno' });
    res.json(c);
  } catch (err) { next(err); }
});

router.patch('/:id/adjust', async (req, res, next) => {
  try {
    const { change, note } = req.body;
    if (change === undefined || change === 0) return res.status(400).json({ error: 'change je obavezan' });
    res.json(await repo.adjustQuantity(req.params.id, change, note, req.user.id));
  } catch (err) { next(err); }
});

router.get('/:id/logs', async (req, res, next) => {
  try { res.json(await repo.getLogs(req.params.id)); } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await repo.remove(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
