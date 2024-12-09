const pool = require("../config/db");

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log('Table "users" created successfully!');
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
};

const dropTable = async () => {
  const query = `
    DROP TABLE IF EXISTS users;
  `;
  try {
    await pool.query(query);
    console.log('Table "users" deleted successfully!');
  } catch (err) {
    console.error("Error dropping table:", err.message);
  }
};

module.exports = { createTable, dropTable };
