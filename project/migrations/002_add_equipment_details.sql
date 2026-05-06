-- Add more equipment details for PB7

ALTER TABLE equipment
  ADD COLUMN IF NOT EXISTS serial_number VARCHAR(120),
  ADD COLUMN IF NOT EXISTS model VARCHAR(120),
  ADD COLUMN IF NOT EXISTS manufacturer VARCHAR(120),
  ADD COLUMN IF NOT EXISTS purchase_date DATE;

CREATE UNIQUE INDEX IF NOT EXISTS ux_equipment_serial_number
  ON equipment (serial_number)
  WHERE serial_number IS NOT NULL;
