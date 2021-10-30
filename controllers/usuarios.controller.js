const { response, request } = require('express');
const { db } = require("../database/config");


//CONSULTARN USUARIOS
const usuariosGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT*FROM USUARIOS WHERE usua_estado='1';");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID USUARIOS
const usuariosIdGet = async(req = request, res = response) => {
    try {
        const idusuario = req.params.usua_id;
        const response = await db.any("SELECT*FROM USUARIOS WHERE usua_estado='1' AND usua_id=$1;", [idusuario]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR USUARIOS
const usuariosPost = async(req, res = response) => {
    try {
        const { rol_id, usua_alias, usua_clave, usua_email } = req.body;
        const response = await db.query(`INSERT INTO USUARIOS
                                            (rol_id,usua_alias,usua_clave,usua_email) 
                                            VALUES 
                                            ($1,$2,$3,$4);`, [rol_id, usua_alias, usua_clave, usua_email]);
        res.json({
            message: `Usuario ${usua_alias} creado exitosamente`,
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR USUARIOS
const usuariosPut = async(req, res = response) => {
    try {
        const idusuario = req.params.usua_id;
        const { usua_clave, usua_email, usua_estado } = req.body;
        const response = await db.query(`UPDATE USUARIOS SET 
                                            usua_clave=$1,
                                            usua_email=$2,
                                            usua_fecha_actualizacion=current_timestamp,
                                            usua_estado=$3 
                                            WHERE usua_id=$4;`, [usua_clave, usua_email, usua_estado, idusuario]);
        res.json({
            message: `Usuario ${idusuario} actualizado exitosamente`
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR USUARIOS
const usuariosDelete = async(req, res = response) => {
    try {
        const idusuario = parseInt(req.params.usua_id);
        const response = await db.query(`UPDATE USUARIOS SET 
                                            usua_fecha_actualizacion=current_timestamp,
                                            usua_estado=0 
                                            WHERE usua_id=$1;`, [idusuario]);
        res.json(`Usuario eliminado con ID: ${idusuario}`);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// LOGIN

module.exports = {
    usuariosGet,
    usuariosIdGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}