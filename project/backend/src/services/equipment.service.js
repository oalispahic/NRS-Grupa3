const equipmentRepo = require('../repositories/equipment.repository');
const waitlistRepo = require('../repositories/waitlist.repository');
const notificationRepo = require('../repositories/notification.repository');

const VALID_STATUSES = ['available', 'reserved', 'in_use', 'maintenance', 'out_of_service'];

function normalizeString(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function normalizeDate(value) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (typeof value === 'string' && Number.isNaN(Date.parse(value))) {
    const err = new Error('Invalid purchase_date. Use YYYY-MM-DD.');
    err.status = 400;
    throw err;
  }
  return value;
}

function handleUniqueError(err) {
  if (err && err.code === '23505') {
    const error = new Error('serial_number must be unique');
    error.status = 409;
    throw error;
  }
  throw err;
}

async function listAll() {
  return equipmentRepo.findAll();
}

async function getById(id) {
  const equipment = await equipmentRepo.findById(id);
  if (!equipment) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }
  return equipment;
}

async function create({ name, description, status, location, location_id, serial_number, model, manufacturer, purchase_date, supplier, last_service, planned_service, warranty_expiry, service_company, safety_notes }) {
  const normalizedName = normalizeString(name);
  const normalizedDescription = normalizeString(description);
  const normalizedLocation = normalizeString(location);
  const normalizedSerial = normalizeString(serial_number);
  const normalizedModel = normalizeString(model);
  const normalizedManufacturer = normalizeString(manufacturer);
  const normalizedPurchaseDate = normalizeDate(purchase_date);
  const normalizedSupplier = normalizeString(supplier);
  const normalizedLastService = normalizeDate(last_service);
  const normalizedPlannedService = normalizeDate(planned_service);
  const normalizedWarrantyExpiry = normalizeDate(warranty_expiry);
  const normalizedServiceCompany = normalizeString(service_company);
  const normalizedSafetyNotes = normalizeString(safety_notes);
  const normalizedLocationId = location_id ? (parseInt(location_id, 10) || null) : null;

  if (!normalizedName) {
    const err = new Error('name is required');
    err.status = 400;
    throw err;
  }

  if (!normalizedSerial) {
    const err = new Error('serial_number is required');
    err.status = 400;
    throw err;
  }

  if (!normalizedModel) {
    const err = new Error('model is required');
    err.status = 400;
    throw err;
  }

  if (status && !VALID_STATUSES.includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    err.status = 400;
    throw err;
  }

  try {
    return await equipmentRepo.create({
      name: normalizedName,
      description: normalizedDescription,
      status,
      location: normalizedLocation,
      location_id: normalizedLocationId,
      serial_number: normalizedSerial,
      model: normalizedModel,
      manufacturer: normalizedManufacturer,
      purchase_date: normalizedPurchaseDate,
      supplier: normalizedSupplier,
      last_service: normalizedLastService,
      planned_service: normalizedPlannedService,
      warranty_expiry: normalizedWarrantyExpiry,
      service_company: normalizedServiceCompany,
      safety_notes: normalizedSafetyNotes,
    });
  } catch (err) {
    handleUniqueError(err);
  }
}

async function update(id, data) {
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    const err = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    err.status = 400;
    throw err;
  }

  const normalizedName = normalizeString(data.name);
  const normalizedDescription = normalizeString(data.description);
  const normalizedLocation = normalizeString(data.location);
  const normalizedSerial = normalizeString(data.serial_number);
  const normalizedModel = normalizeString(data.model);
  const normalizedManufacturer = normalizeString(data.manufacturer);
  const normalizedPurchaseDate = normalizeDate(data.purchase_date);
  const normalizedSupplier = normalizeString(data.supplier);
  const normalizedLastService = normalizeDate(data.last_service);
  const normalizedPlannedService = normalizeDate(data.planned_service);
  const normalizedWarrantyExpiry = normalizeDate(data.warranty_expiry);
  const normalizedServiceCompany = normalizeString(data.service_company);
  const normalizedSafetyNotes = normalizeString(data.safety_notes);
  const normalizedLocationId = data.location_id ? (parseInt(data.location_id, 10) || null) : null;

  if (data.serial_number !== undefined && !normalizedSerial) {
    const err = new Error('serial_number is required');
    err.status = 400;
    throw err;
  }

  if (data.model !== undefined && !normalizedModel) {
    const err = new Error('model is required');
    err.status = 400;
    throw err;
  }

  let updated;
  try {
    updated = await equipmentRepo.update(id, {
      name: normalizedName,
      description: normalizedDescription,
      status: data.status,
      location: normalizedLocation,
      location_id: normalizedLocationId,
      serial_number: normalizedSerial,
      model: normalizedModel,
      manufacturer: normalizedManufacturer,
      purchase_date: normalizedPurchaseDate,
      supplier: normalizedSupplier,
      last_service: normalizedLastService,
      planned_service: normalizedPlannedService,
      warranty_expiry: normalizedWarrantyExpiry,
      service_company: normalizedServiceCompany,
      safety_notes: normalizedSafetyNotes,
    });
  } catch (err) {
    handleUniqueError(err);
  }

  if (!updated) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }

  if (data.status === 'available') {
    const waitlist = await waitlistRepo.findByEquipment(id).catch(() => []);
    if (waitlist.length > 0) {
      await Promise.all(
        waitlist.map(entry =>
          notificationRepo.create({
            userId: entry.user_id,
            type: 'equipment_available',
            title: 'Oprema je dostupna',
            message: `"${updated.name}" je sada slobodna za rezervaciju.`,
          }).catch(() => {})
        )
      );
    }
  }

  return updated;
}

async function remove(id) {
  const deleted = await equipmentRepo.remove(id);
  if (!deleted) {
    const err = new Error('Equipment not found');
    err.status = 404;
    throw err;
  }
}

module.exports = { listAll, getById, create, update, remove };
