const { Router } = require('express');
const { check } = require('express-validator');
const { familiaresGet, familiaresIdGet, familiaresPost, familiaresDelete, familiaresPut } = require('../controllers/familiares.controller');
const { validarCampo } = require('../middlewares/validar-campos');


const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/familia', familiaresGet);
// GET BY ID
router.get('/familia/:ciud_id', familiaresIdGet);
// POST
router.post('/familia', familiaresPost);
// DELETE
router.delete('/familia/:ciud_id', familiaresDelete);
// PUT
router.put('/familia/:famil_id', [
    check('famil_nombres', 'El nombre es obligatorio!').notEmpty(),
    check('famil_apellidos', 'El apellido es obligatorio!').notEmpty(), validarCampo
], familiaresPut);