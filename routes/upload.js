/*
ruta: '/api/upload/:tipo/:id'


 */

const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { subirArchivo, retornaImagen } = require('../controllers/upload');

const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();
// middleware para subir archivos, npm i express-fileupload
router.use(fileUpload());


router.put('/:tipo/:id', [validarJWT], subirArchivo);

router.get('/:tipo/:foto', retornaImagen);




module.exports = router;