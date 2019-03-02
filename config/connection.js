require("dotenv").config();

const mysql = require("mysql");
let connection;

// Create the database connection
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "Olen",
        password: process.env.DBPASS,
        database: "burgers_db"
    });
};

module.exports = connection;