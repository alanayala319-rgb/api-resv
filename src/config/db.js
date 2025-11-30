const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "restaurante_resv"
});

connection.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conexión a MySQL establecida");
});

module.exports = connection;
