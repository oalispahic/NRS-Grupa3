CREATE TABLE IF NOT EXISTS messages (
  id                SERIAL PRIMARY KEY,
  sender_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  body              TEXT NOT NULL,
  equipment_id      INTEGER REFERENCES equipment(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at           TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS messages_sender_idx    ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_recipient_idx ON messages(recipient_user_id);
CREATE INDEX IF NOT EXISTS messages_created_idx   ON messages(created_at DESC);
