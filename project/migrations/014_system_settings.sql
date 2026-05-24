CREATE TABLE IF NOT EXISTS system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO system_settings (key, value, description) VALUES
  ('max_reservation_days', '30', 'Maksimalno trajanje jedne rezervacije u danima'),
  ('max_advance_days', '90', 'Maksimalan broj dana unaprijed za kreiranje rezervacije'),
  ('max_active_reservations', '5', 'Maksimalan broj aktivnih rezervacija po korisniku')
ON CONFLICT (key) DO NOTHING;
