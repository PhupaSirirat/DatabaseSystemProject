const { Pool } = require('pg');

// Create a new Pool instance with your PostgreSQL database connection details
const pool = new Pool({
  user: 'postgres',
  password: 'XfaaDvXn4aYqjM8xDfy9',
  host: 'containers-us-west-3.railway.app',
  port: '6789',
  database: 'railway',
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

// Example CRUD operations

// Create a new record in the database
//const setAccount = async (data) => {
  //const { accountid, username, email, password, gameaccountid, accountregisterdate } = data;
  //const sql = 'INSERT INTO users (accountid, username, email, password, gameaccountid, accountregisterdate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  //const values = [accountid, username, email, password, gameaccountid, accountregisterdate];
  //const result = await query(sql, values);
  //return result[0];
//};

// Read records from the database
//const getAllAccount = async () => {
  //const sql = 'Select * from account';
  //const result = await query(sql);
  //return result;
//};

// Update a record in the database
// const updateRecord = async (id, data) => {
//   const { name, age, email } = data;
//   const sql = 'UPDATE users SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *';
//   const values = [name, age, email, id];
//   const result = await query(sql, values);
//   return result[0];
// };

// Delete a record from the database
// const deleteRecord = async (id) => {
//   const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
//   const values = [id];
//   const result = await query(sql, values);
//   return result[0];
// };

module.exports = {
  pool,
  query
};
