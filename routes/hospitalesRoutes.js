/*
ruta: '/api/hospitales'


 */

const { check } = require('express-validator');
const { Router } = require('express');

// importamos el middleware
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);


// ruta/check, [validaciones, mensaje de error], middleware, funcion
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(), validarCampos
], crearHospital);


router.put('/:id', [], actualizarHospital);

router.delete('/:id', borrarHospital);



module.exports = router;