/* eslint-disable */
const mysql = require("mysql2");
const config = require("./config");
// Create a connection to the database
const connection = mysql.createConnection({
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  port: 3306,
});

// open the MySQL connection
connection.connect((error) => {
  // if (error) throw error;
  if (error) {
    // console.error('error connecting: ', error);
    for (var k in error) {
      console.log(`${k}: ${error[k]}`);
    }
    return;
  }
  console.log("Successfully connected to the database.");
});
// connection.end();
module.exports = connection;
