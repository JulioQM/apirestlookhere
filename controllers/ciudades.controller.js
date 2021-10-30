const { response, request } = require('express');
const { db } = require("../database/config");

//TO DO  FALTA METODO QUE AL COGER LA PROVINCIA SE DESPLIEGUE LAS CIUDADES 
// PROVINCIA ESCOGIDA Y CIUDADES DESPLEGABLE AL COMBOBOX
const lista_ciudad_provincias = async(req = request, res = response) => {
    try {
        const idprovincia = req.params.prov_id;
        const response = await db.any(`SELECT c.ciud_id,c.ciud_nombre 
                                            FROM PROVINCIAS p
                                            inner join CIUDADES c 
                                            ON 
                                            c.prov_id=p.prov_id 
                                            WHERE p.prov_id=$1;`, [idprovincia]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// LISTA DE PROVINCIAS
const provinciasGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT prov_nombre FROM PROVINCIAS WHERE prov_estado='1'");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTARN CIUDADES
const ciudadesGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT*FROM CIUDADES WHERE ciud_estado='1'");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID CIUDADES
const ciudadesIdGet = async(req = request, res = response) => {
    try {
        const idciudad = req.params.ciud_id;
        const response = await db.any("SELECT*FROM CIUDADES WHERE ciud_estado='1' AND ciud_id=$1;", [idciudad]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR CIUDADES
const ciudadesPost = async(req, res = response) => {
    try {
        const { prov_id, ciud_nombre } = req.body;
        const response = await db.query(`INSERT INTO CIUDADES
                                            (prov_id,ciud_nombre) 
                                            VALUES 
                                            ($1,$2);`, [prov_id, ciud_nombre]);
        res.json({
            message: `Ciudad ${ciud_nombre} creado exitosamente`,
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR CIUDADES
const ciudadesPut = async(req, res = response) => {
    try {
        const idciudad = req.params.ciud_id;
        const { prov_id, ciud_nombre, ciud_estado } = req.body;
        const response = await db.query(`UPDATE CIUDADES 
                                            SET 
                                            prov_id=$1,
                                            ciud_nombre=$2,
                                            ciud_fecha_actualizacion=current_timestamp,
                                            ciud_estado=$3 
                                            WHERE
                                            ciud_id=$4;`, [prov_id, ciud_nombre, ciud_estado, idciudad]);
        res.json({
            message: `Ciudad ${idciudad} actualizado exitosamente`
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR CIUDADES
const ciudadesDelete = async(req, res = response) => {
    try {
        const idciudad = parseInt(req.params.ciud_id);
        const response = await db.query(`UPDATE CIUDADES 
                                            SET 
                                            ciud_fecha_actualizacion=current_timestamp,
                                            ciud_estado=0 
                                            WHERE 
                                            ciud_id=$1;`, [idciudad]);
        res.json(`Ciudad eliminado con ID: ${idciudad}`);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    provinciasGet,
    lista_ciudad_provincias,
    ciudadesGet,
    ciudadesIdGet,
    ciudadesPost,
    ciudadesPut,
    ciudadesDelete
}