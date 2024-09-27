const mysql = require("mysql2/promise");

async function initializeConnection() {
  try {
    const connectionConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      URL : process.env.DB_URL,
    };

    const connection = await mysql.createConnection(connectionConfig.URL);
    console.log(`connected to ${connectionConfig.database} database`);

    return connection;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

module.exports = { initializeConnection };