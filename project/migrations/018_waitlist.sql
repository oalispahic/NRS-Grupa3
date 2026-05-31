CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (equipment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_equipment ON waitlist(equipment_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_user ON waitlist(user_id);
