require('dotenv').config()

const mysql = require('mysql2/promise')


const pool = mysql.createPool({
    user:process.env.DB_USERNAME,
    host:process.env.DB_HOSTNAME,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
});

module.exports = pool
