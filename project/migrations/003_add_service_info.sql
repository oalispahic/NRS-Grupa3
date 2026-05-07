-- Add service and supplier info to equipment

ALTER TABLE equipment
  ADD COLUMN IF NOT EXISTS supplier        VARCHAR(255),
  ADD COLUMN IF NOT EXISTS last_service    DATE,
  ADD COLUMN IF NOT EXISTS planned_service DATE,
  ADD COLUMN IF NOT EXISTS warranty_expiry DATE,
  ADD COLUMN IF NOT EXISTS service_company VARCHAR(255);
