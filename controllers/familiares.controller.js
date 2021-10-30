const { response, request } = require('express');
const { db } = require("../database/config");


//CONSULTAR FAMILIARES
const familiaresGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT*FROM FAMILIARES WHERE famil_estado='1';");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID FAMILIARES
const familiaresIdGet = async(req = request, res = response) => {
    try {
        const idfamilia = req.params.famil_id;
        const response = await db.any("SELECT*FROM FAMILIARES WHERE famil_estado='1' AND famil_id=$1;", [idfamilia]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR FAMILIARES
const familiaresPost = async(req, res = response) => {
    try {
        const { pers_id, famil_nombres, famil_apellidos, famil_celular, famil_convencional, famil_direccion } = req.body;
        const response = await db.query(`INSERT INTO FAMILIARES(
                                            pers_id,
                                            famil_nombres,
                                            famil_apellidos,
                                            famil_celular,
                                            famil_convencional,
                                            famil_direccion) 
                                            VALUES 
                                            ($1,$2,$3,$4,$5,$6);`, [pers_id, famil_nombres, famil_apellidos, famil_celular, famil_convencional, famil_direccion]);
        res.json({
            message: `Datos familiares ${famil_nombres} creado exitosamente`,
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR FAMILIARES
const familiaresPut = async(req, res = response) => {
    try {
        const idfamilia = req.params.famil_id;
        const { famil_nombres, famil_apellidos, famil_celular, famil_convencional, famil_direccion } = req.body;
        const response = await db.query(`UPDATE FAMILIARES SET         
                                            famil_nombres=$1,
                                            famil_apellidos=$2,
                                            famil_celular=$3,
                                            famil_convencional=$4,
                                            famil_direccion=$5,
                                            famil_fecha_actualizacion=current_timestamp,
                                            famil_estado=$6 
                                            WHERE 
                                            famil_id=$7;
                                            `, [famil_nombres, famil_apellidos, famil_celular, famil_convencional, famil_direccion, idfamilia]);
        res.json({
            message: `Datos familiares ${idfamilia} actualizado exitosamente`
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR FAMILIARES
const familiaresDelete = async(req, res = response) => {
    try {
        const idfamilia = parseInt(req.params.famil_id);
        const response = await db.query(`UPDATE FAMILIARES SET
                                            famil_fecha_actualizacion=current_timestamp,
                                            famil_estado=0 
                                            WHERE 
                                            famil_id=$1;`, [idfamilia]);
        res.json(`Datos familiares eliminado con ID: ${idfamilia}`);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    familiaresGet,
    familiaresIdGet,
    familiaresPost,
    familiaresPut,
    familiaresDelete
}