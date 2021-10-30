const { response, request } = require('express');
const { db } = require("../database/config");


//CONSULTARAN PERSONAS
const personaGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT*FROM PERSONAS WHERE pers_estado='1';");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID PERSONAS
const personasIdGet = async(req = request, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const response = await db.any("SELECT*FROM PERSONAS WHERE pers_estado='1' AND pers_id=$1;", [idusuario]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR PERSONAS
const personasPost = async(req, res = response) => {
    try {
        const {
            pers_id,
            usua_id,
            prov_id,
            ciud_id,
            enfer_id,
            pers_identificacion,
            pers_nombres,
            pers_apellidos,
            pers_direccion,
            pers_celular,
            pers_fecha_nacimiento,
            pers_sexo,
            pers_tiene_medicacion,
            pers_tiene_dosificacion,
            pers_tiene_enfermedad,
            pers_desc_medicacion,
            pers_desc_dosificacion,
            pers_desc_enfermedad,
            pers_link_qr,
            pers_foto,
            pers_fecha_registro,
            pers_fecha_actualizacion,
            pers_estado
        } = req.body;
        const response = await db.query(`INSERT INTO PERSONAS(           
            usua_id,
            prov_id,
            ciud_id,
            enfer_id,
            pers_identificacion,
            pers_nombres,
            pers_apellidos,
            pers_direccion,
            pers_celular,
            pers_fecha_nacimiento,
            pers_sexo,
            pers_tiene_medicacion,
            pers_tiene_dosificacion,
            pers_tiene_enfermedad,
            pers_desc_medicacion,
            pers_desc_dosificacion,
            pers_desc_enfermedad,
            pers_link_qr,
            pers_foto,       
            pers_estado           
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20);`, [rol_id, usua_alias, usua_clave, usua_email]);
        res.json({
            message: `Usuario ${usua_alias} creado exitosamente`,
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR PERSONAS
const personasPut = async(req, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const {
            pers_id,
            usua_id,
            prov_id,
            ciud_id,
            enfer_id,
            pers_identificacion,
            pers_nombres,
            pers_apellidos,
            pers_direccion,
            pers_celular,
            pers_fecha_nacimiento,
            pers_sexo,
            pers_tiene_medicacion,
            pers_tiene_dosificacion,
            pers_tiene_enfermedad,
            pers_desc_medicacion,
            pers_desc_dosificacion,
            pers_desc_enfermedad,
            pers_link_qr,
            pers_foto,
            pers_fecha_registro,
            pers_fecha_actualizacion,
            pers_estado
        } = req.body;
        const response = await db.query(`UPDATE PERSONAS SET 
        usua_clave=$1,
        usua_email=$2,
        usua_fecha_actualizacion=current_timestamp,
        usua_estado=$3 WHERE usua_id=$4;`, [usua_clave, usua_email, usua_estado, idusuario]);
        res.json({
            message: `Usuario ${idusuario} actualizado exitosamente`
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR PERSONAS
const personasDelete = async(req, res = response) => {
    try {
        const idpersona = parseInt(req.params.pers_id);
        const response = await db.query("UPDATE PERSONAS SET pers_estado=0 WHERE pers_id=$1;", [idpersona]);
        res.json(`Rol eliminado con ID: ${idpersona}`);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    personasGet,
    personasIdGet,
    personasPost,
    personasPut,
    personasDelete
}