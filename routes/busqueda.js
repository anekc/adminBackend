/*
ruta: '/api/todo/:busqueda'


 */

const { Router } = require('express');
const { busqueda, busquedaCollection } = require('../controllers/busqueda');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/:busqueda', [validarJWT], busqueda);

router.get('/coleccion/:tabla/:busqueda', [validarJWT], busquedaCollection);


module.exports = router;