const { Router } = require('express');
const { check } = require('express-validator');
const { ciudadesGet, ciudadesIdGet, ciudadesPost, ciudadesDelete, ciudadesPut, lista_ciudad_provincias, provinciasGet } = require('../controllers/ciudades.controller');
const { validarCampo } = require('../middlewares/validar-campos');


const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/ciudad', ciudadesGet);
// GET BY ID
router.get('/ciudad/:ciud_id', ciudadesIdGet);
// POST
router.post('/ciudad', ciudadesPost);
// DELETE
router.delete('/ciudad/:ciud_id', ciudadesDelete);
// PUT
router.put('/ciudad/:ciud_id', [
    check('ciud_nombre', 'El nombre es obligatorio!').notEmpty(), validarCampo
], ciudadesPut);

// GET LISTA DE CIUDADES FILTRADAS POR PROVINCIA
router.get('/provincia/:prov_id', lista_ciudad_provincias);
// GET LISTA PROVINCIAS
router.get('/provincia', provinciasGet);

module.exports = router;