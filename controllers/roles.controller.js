const { response, request } = require('express');
const { db } = require("../database/config");


//CONSULTARN ROLES
const rolesGet = async(req = request, res = response) => {
    try {
        const response = await db.any("SELECT*FROM ROLES WHERE rol_estado='1';");
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID ROLES
const rolesIdGet = async(req = request, res = response) => {
    try {
        const idrol = req.params.rol_id;
        const response = await db.any("SELECT*FROM ROLES WHERE rol_estado='1' AND rol_id=$1;", [idrol]);
        res.json(response);
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR ROLES
const rolesPost = async(req, res = response) => {
    try {
        const { rol_nombre } = req.body;
        const response = await db.query("INSERT INTO ROLES(rol_nombre) VALUES ($1);", [rol_nombre]);
        res.json({
            message: `Rol ${rol_nombre} creado con exito`,
            rol_nombre
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR ROL
const rolesPut = async(req, res = response) => {
    try {
        const idrol = req.params.rol_id;
        const { rol_nombre } = req.body;
        const response = await db.query(`UPDATE roles SET 
                                            rol_nombre=$1,
                                            rol_fecha_actualizacion=current_timestamp
                                            WHERE rol_id=$2;`, [rol_nombre, idrol]);
        res.json({
            message: `Rol ${rol_nombre} actualizado`
        });
    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR ROL
const rolesDelete = async(req, res = response) => {
    try {
        const idrol = parseInt(req.params.rol_id);
        const response = await db.query(`UPDATE ROLES SET 
                                            rol_fecha_actualizacion=current_timestamp,
                                            rol_estado=0 WHERE rol_id=$1;`, [idrol]);
        res.json(`Rol eliminado con ID: ${idrol}`);

    } catch (error) {
        res.json({
            message: `Error detectado: ${error}`

        });
    }
}

module.exports = {
    rolesGet,
    rolesIdGet,
    rolesPost,
    rolesPut,
    rolesDelete
}