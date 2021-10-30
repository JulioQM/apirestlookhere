const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { rolesGet, rolesPost, rolesDelete, rolesPut, rolesIdGet } = require('../controllers/roles.controller');

const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/rol', rolesGet);
// GET BY ID
router.get('/rol/:rol_id', rolesIdGet);
// POST
router.post('/rol', [
    check('rol_nombre', 'El nombre es obligatorio!').notEmpty(), validarCampo
], rolesPost);
// DELETE
router.delete('/rol/:rol_id', rolesDelete);
// PUT
router.put('/rol/:rol_id', [
    check('rol_nombre', 'El nombre es obligatorio!').notEmpty(),
    check('rol_estado', 'El estado es obligatorio!').notEmpty(), validarCampo
], rolesPut);



module.exports = router;