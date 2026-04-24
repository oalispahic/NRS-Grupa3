-- NRS-Grupa3: Initial database schema
-- Run this file against your Neon or Supabase PostgreSQL database

CREATE TYPE user_role AS ENUM ('admin', 'laborant');
CREATE TYPE equipment_status AS ENUM ('available', 'reserved', 'in_use', 'maintenance', 'out_of_service');
CREATE TYPE reservation_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(255) NOT NULL,
  role          user_role NOT NULL DEFAULT 'laborant',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE equipment (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  status      equipment_status NOT NULL DEFAULT 'available',
  location    VARCHAR(255),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reservations (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  start_time   TIMESTAMPTZ NOT NULL,
  end_time     TIMESTAMPTZ NOT NULL,
  status       reservation_status NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_time_inversion CHECK (end_time > start_time)
);

-- Partial index optimised for conflict detection queries
CREATE INDEX idx_reservations_equipment_time
  ON reservations (equipment_id, start_time, end_time)
  WHERE status IN ('pending', 'approved');
