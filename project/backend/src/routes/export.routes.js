const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const pool = require('../config/db');

function toCSV(rows, columns) {
  const header = columns.map(c => c.label).join(',');
  const lines = rows.map(row =>
    columns.map(c => {
      const val = row[c.key];
      if (val === null || val === undefined) return '';
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
    }).join(',')
  );
  return [header, ...lines].join('\n');
}

router.use(authenticate, requireRole('admin', 'test'));

router.get('/reservations', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.id, u.full_name, u.email, e.name AS equipment_name,
              r.start_time, r.end_time, r.status, r.rejection_reason, r.created_at
       FROM reservations r
       JOIN users u ON u.id = r.user_id
       JOIN equipment e ON e.id = r.equipment_id
       ORDER BY r.created_at DESC`
    );
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'full_name', label: 'Korisnik' },
      { key: 'email', label: 'Email' },
      { key: 'equipment_name', label: 'Oprema' },
      { key: 'start_time', label: 'Pocetak' },
      { key: 'end_time', label: 'Kraj' },
      { key: 'status', label: 'Status' },
      { key: 'rejection_reason', label: 'Razlog odbijanja' },
      { key: 'created_at', label: 'Kreirano' },
    ];
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="rezervacije.csv"');
    res.send('﻿' + toCSV(rows, columns));
  } catch (err) { next(err); }
});

router.get('/equipment', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT e.id, e.name, e.status, e.location, l.name AS location_name,
              e.model, e.manufacturer, e.serial_number,
              e.purchase_date, e.warranty_expiry, e.last_service,
              COUNT(r.id) AS total_reservations
       FROM equipment e
       LEFT JOIN locations l ON l.id = e.location_id
       LEFT JOIN reservations r ON r.equipment_id = e.id
       GROUP BY e.id, l.name
       ORDER BY e.name`
    );
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Naziv' },
      { key: 'status', label: 'Status' },
      { key: 'location_name', label: 'Prostorija' },
      { key: 'location', label: 'Lokacija' },
      { key: 'model', label: 'Model' },
      { key: 'manufacturer', label: 'Proizvođač' },
      { key: 'serial_number', label: 'Serijski broj' },
      { key: 'purchase_date', label: 'Datum nabavke' },
      { key: 'warranty_expiry', label: 'Garantni rok' },
      { key: 'last_service', label: 'Zadnji servis' },
      { key: 'total_reservations', label: 'Ukupno rezervacija' },
    ];
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="oprema.csv"');
    res.send('﻿' + toCSV(rows, columns));
  } catch (err) { next(err); }
});

module.exports = router;
