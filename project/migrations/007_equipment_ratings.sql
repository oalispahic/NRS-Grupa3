CREATE TABLE IF NOT EXISTS equipment_ratings (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  equipment_id   INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  rating         SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment        TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (reservation_id)
);

CREATE INDEX IF NOT EXISTS idx_ratings_equipment ON equipment_ratings(equipment_id);
