const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosPost, usuariosGet, usuariosIdGet, usuariosDelete, usuariosPut } = require('../controllers/usuarios.controller');
const { validarCampo } = require('../middlewares/validar-campos');


const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/usuario', usuariosGet);
// GET BY ID
router.get('/usuario/:usua_id', usuariosIdGet);
// POST
router.post('/Usuario', usuariosPost);
// DELETE
router.delete('/usuario/:usua_id', usuariosDelete);
// PUT
router.put('/usuario/:usua_id', [
    check('usua_email', 'El nombre es obligatorio!').notEmpty(),
    check('usua_clave', 'El estado es obligatorio!').notEmpty(), validarCampo
], usuariosPut);



module.exports = router;