const mysql = require('mysql2/promise');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') },
  connectionLimit: 10,
};

const pool = mysql.createPool(dbConfig);

const executeQuery = async (query) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(query);
    console.log("Query executed successfully");
    return rows;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { executeQuery };
