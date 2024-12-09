const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
// PostgreSQL ulanish sozlamalari
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // PostgreSQL uchun standart port
});

module.exports = pool;
