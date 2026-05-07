const equipmentRepo = require('../src/repositories/equipment.repository');
const equipmentService = require('../src/services/equipment.service');

jest.mock('../src/repositories/equipment.repository', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

describe('equipment.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('listAll returns equipment', async () => {
    equipmentRepo.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await equipmentService.listAll();

    expect(result).toEqual([{ id: 1 }]);
  });

  test('getById throws when not found', async () => {
    equipmentRepo.findById.mockResolvedValue(null);

    await expect(equipmentService.getById(99))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('create rejects missing name', async () => {
    await expect(equipmentService.create({ serial_number: 'SN', model: 'M1' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('create rejects missing serial number', async () => {
    await expect(equipmentService.create({ name: 'Eq', model: 'M1' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('create rejects missing model', async () => {
    await expect(equipmentService.create({ name: 'Eq', serial_number: 'SN' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('create rejects invalid status', async () => {
    await expect(equipmentService.create({
      name: 'Eq',
      serial_number: 'SN',
      model: 'M1',
      status: 'invalid',
    })).rejects.toMatchObject({ status: 400 });
  });

  test('create rejects invalid date format', async () => {
    await expect(equipmentService.create({
      name: 'Eq',
      serial_number: 'SN',
      model: 'M1',
      purchase_date: 'invalid-date',
    })).rejects.toMatchObject({ status: 400 });
  });

  test('create normalizes input and calls repository', async () => {
    equipmentRepo.create.mockResolvedValue({ id: 1, name: 'Microscope' });

    await equipmentService.create({
      name: '  Microscope  ',
      serial_number: '  SN-1 ',
      model: '  M-1 ',
      description: '   ',
      location: ' ',
      status: 'available',
    });

    expect(equipmentRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Microscope',
      serial_number: 'SN-1',
      model: 'M-1',
      description: null,
      location: null,
      status: 'available',
    }));
  });

  test('create maps unique constraint error', async () => {
    equipmentRepo.create.mockRejectedValue({ code: '23505' });

    await expect(equipmentService.create({
      name: 'Eq',
      serial_number: 'SN',
      model: 'M1',
    })).rejects.toMatchObject({ status: 409 });
  });

  test('update rejects invalid status', async () => {
    await expect(equipmentService.update(1, { status: 'invalid' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('update rejects empty serial number when provided', async () => {
    await expect(equipmentService.update(1, { serial_number: ' ' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('update throws when equipment not found', async () => {
    equipmentRepo.update.mockResolvedValue(null);

    await expect(equipmentService.update(1, { name: 'New' }))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('update returns updated equipment', async () => {
    equipmentRepo.update.mockResolvedValue({ id: 1, name: 'Updated' });

    const result = await equipmentService.update(1, { name: 'Updated' });

    expect(result).toEqual({ id: 1, name: 'Updated' });
    expect(equipmentRepo.update).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Updated',
    }));
  });

  test('remove throws when equipment not found', async () => {
    equipmentRepo.remove.mockResolvedValue(false);

    await expect(equipmentService.remove(1))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('remove resolves when equipment deleted', async () => {
    equipmentRepo.remove.mockResolvedValue(true);

    await expect(equipmentService.remove(1)).resolves.toBeUndefined();
  });
});
