const { Pool } = require('pg');
require('dotenv').config();

// Support both a full DATABASE_URL and individual connection params.
// Individual params are more reliable when the Supabase password contains
// special characters that would need URL-encoding in a connection string.
// Supabase transaction mode (port 6543) must be used in production.
// Session mode (port 5432) has a hard limit of 15 simultaneous connections
// across ALL serverless instances — easily exhausted under any load.
// Set DB_PORT=6543 in Vercel environment variables.
const defaultPort = (process.env.DB_HOST || '').includes('pooler.supabase.com') ? 6543 : 5432;

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host:     process.env.DB_HOST,
      port:     parseInt(process.env.DB_PORT || String(defaultPort), 10),
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:      { rejectUnauthorized: false },
    };

// max:1 per serverless instance — each Vercel invocation is short-lived;
// a single connection is sufficient and prevents exhausting Supabase's limit.
const pool = new Pool({
  ...poolConfig,
  max: 1,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 8000,
});

module.exports = pool;
