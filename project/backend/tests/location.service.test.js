const locationRepo = require('../src/repositories/location.repository');
const locationService = require('../src/services/location.service');

jest.mock('../src/repositories/location.repository', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

describe('location.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create rejects missing name', async () => {
    await expect(locationService.create({ name: '  ' }))
      .rejects
      .toMatchObject({ status: 400 });
  });

  test('create trims input', async () => {
    locationRepo.create.mockResolvedValue({ id: 1, name: 'Lab A', description: 'Opis' });

    const result = await locationService.create({ name: '  Lab A  ', description: '  Opis  ' });

    expect(locationRepo.create).toHaveBeenCalledWith({ name: 'Lab A', description: 'Opis' });
    expect(result).toEqual({ id: 1, name: 'Lab A', description: 'Opis' });
  });

  test('update rejects missing location', async () => {
    locationRepo.update.mockResolvedValue(null);

    await expect(locationService.update(3, { name: 'Lab B' }))
      .rejects
      .toMatchObject({ status: 404 });
  });

  test('remove rejects missing location', async () => {
    locationRepo.remove.mockResolvedValue(false);

    await expect(locationService.remove(8))
      .rejects
      .toMatchObject({ status: 404 });
  });
});
