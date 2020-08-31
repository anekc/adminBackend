/*
Path: 'api/login'
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();



router.post('/', [

        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login);



router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(), validarCampos
    ],
    googleSignIn);


module.exports = router;