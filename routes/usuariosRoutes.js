/*
ruta: '/api/usuarios'


 */

const { check } = require('express-validator');
const { Router } = require('express');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
// importamos el middleware
const { validarJWT, validarAdminRole, validarAdminRole_OMismoUsuario } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
// se crean las rutas para las peticiones en la API
router.get('/', validarJWT, getUsuarios);
// ruta/check, [validaciones, mensaje de error], middleware, funcion
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios);


router.put('/:id', [validarJWT, validarAdminRole_OMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [validarJWT, validarAdminRole],
    borrarUsuario);



module.exports = router;