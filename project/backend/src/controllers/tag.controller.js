const tagService = require('../services/tag.service');

async function getAll(req, res, next) {
  try { res.json(await tagService.getAllTags()); } catch (err) { next(err); }
}

async function create(req, res, next) {
  try { res.status(201).json(await tagService.createTag(req.body)); } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try { await tagService.deleteTag(req.params.id); res.json({ ok: true }); } catch (err) { next(err); }
}

async function getEquipmentTags(req, res, next) {
  try { res.json(await tagService.getEquipmentTags(req.params.id)); } catch (err) { next(err); }
}

async function setEquipmentTags(req, res, next) {
  try {
    const tags = await tagService.setEquipmentTags(req.params.id, req.body.tagIds || []);
    res.json(tags);
  } catch (err) { next(err); }
}

module.exports = { getAll, create, remove, getEquipmentTags, setEquipmentTags };
