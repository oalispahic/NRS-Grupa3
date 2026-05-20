const tagRepo = require('../src/repositories/tag.repository');
const tagService = require('../src/services/tag.service');
const db = require('../src/config/db');

jest.mock('../src/repositories/tag.repository', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  findByEquipment: jest.fn(),
  addToEquipment: jest.fn(),
}));

jest.mock('../src/config/db', () => ({
  query: jest.fn(),
}));

describe('tag.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createTag rejects empty name', async () => {
    await expect(tagService.createTag({ name: '  ' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('createTag trims name', async () => {
    tagRepo.create.mockResolvedValue({ id: 1, name: 'PCR' });

    await tagService.createTag({ name: '  PCR ', color: '#000' });

    expect(tagRepo.create).toHaveBeenCalledWith({ name: 'PCR', color: '#000' });
  });

  test('deleteTag rejects missing tag', async () => {
    tagRepo.remove.mockResolvedValue(false);

    await expect(tagService.deleteTag(5))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('getEquipmentTags returns tags', async () => {
    tagRepo.findByEquipment.mockResolvedValue([{ id: 1 }]);

    const result = await tagService.getEquipmentTags(3);

    expect(result).toEqual([{ id: 1 }]);
  });

  test('setEquipmentTags replaces tag assignments', async () => {
    tagRepo.findByEquipment.mockResolvedValue([{ id: 1 }]);

    const result = await tagService.setEquipmentTags(8, [1, 2]);

    expect(db.query).toHaveBeenCalledWith('DELETE FROM equipment_tags WHERE equipment_id = $1', [8]);
    expect(tagRepo.addToEquipment).toHaveBeenCalledWith(8, 1);
    expect(tagRepo.addToEquipment).toHaveBeenCalledWith(8, 2);
    expect(tagRepo.findByEquipment).toHaveBeenCalledWith(8);
    expect(result).toEqual([{ id: 1 }]);
  });
});
