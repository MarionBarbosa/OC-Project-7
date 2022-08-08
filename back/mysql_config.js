const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");
//connection to MySQL database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected to database");
});

module.exports = connection;
