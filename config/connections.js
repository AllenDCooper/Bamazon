var mysql = require("mysql");
require('dotenv').config();

// set up MySQL database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon"
});
  
// connect to MySQL database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
console.log("connected as id " + connection.threadId);
});

module.exports = connection;