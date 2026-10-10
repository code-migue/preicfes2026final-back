const mysql = require('mysql2');
const path = require('node:path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
    throw new Error(`Faltan variables de entorno para la base de datos: ${missingEnv.join(', ')}`);
}

const port = Number(process.env.DB_PORT || 17453);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT debe ser un puerto válido');
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool.promise();
