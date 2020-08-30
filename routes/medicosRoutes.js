/*
ruta: '/api/medicos'


 */

const { check } = require('express-validator');
const { Router } = require('express');
const {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

// importamos el middleware
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', getMedico);


// ruta/check, [validaciones, mensaje de error], middleware, funcion
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser válido').isMongoId(),
    validarCampos
], crearMedico);


router.put('/:id', [], actualizarMedico);

router.delete('/:id', borrarMedico);



module.exports = router;


module.exports = router;