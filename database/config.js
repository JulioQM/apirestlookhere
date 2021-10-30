const pgPromise = require('pg-promise');
const config = {
    host: process.env.HOST,
    port: "5432",
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: true
}
const pgp = pgPromise({});
const db = pgp(config);
//db.any("select * from roles").then(res => { console.log(res) }); //comprobar si hay conexion
exports.db = db;