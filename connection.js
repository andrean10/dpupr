const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conn.connect((err) => {
    if (err) {
        console.log(`Error connection: ${err.stack}`);
        return;
    } else {
        console.log('Database Success Connected!');
    }
});

module.exports = conn;