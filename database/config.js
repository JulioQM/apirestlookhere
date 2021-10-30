const pgPromise = require('pg-promise');
const config = {
    user: 'postgres',
    port: "5432",
    host: 'localhost',
    database: process.env.CADENA_CONEXION,
    password: '12345'
        //ssl:true      
}
const pgp = pgPromise({});
const db = pgp(config);
//db.any("select * from roles").then(res => { console.log(res) }); //comprobar si hay conexion
exports.db = db;