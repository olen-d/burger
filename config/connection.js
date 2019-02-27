require("dotenv").config();

const mysql = require("mysql");

// Create the database connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Olen",
    password: process.env.DBPASS,
    database: "burgers_db"
});

modules.export = connection;