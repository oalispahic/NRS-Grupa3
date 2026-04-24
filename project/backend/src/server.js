const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3001;

pool.connect()
  .then(client => {
    client.release();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
