const { Pool } = require('pg');

// Create a new Pool instance with your PostgreSQL database connection details
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});


// Function to run a query using the pool
const query = async (sql, values) => {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, values);
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query
};
