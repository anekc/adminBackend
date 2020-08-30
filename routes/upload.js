/*
ruta: '/api/upload/:tipo/:id'


 */

const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { subirArchivo } = require('../controllers/upload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.use(fileUpload());


router.put('/:tipo/:id', [validarJWT], subirArchivo);




module.exports = router;