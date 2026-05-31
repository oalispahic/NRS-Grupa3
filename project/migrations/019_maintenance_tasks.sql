CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE maintenance_status AS ENUM ('open', 'in_progress', 'completed');

CREATE TABLE IF NOT EXISTS maintenance_tasks (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority maintenance_priority DEFAULT 'medium',
  status maintenance_status DEFAULT 'open',
  due_date DATE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_maintenance_equipment ON maintenance_tasks(equipment_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_assigned ON maintenance_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_tasks(status);
