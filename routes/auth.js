/*
Path: 'api/login'
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
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

router.get('/renew', validarJWT,
    renewToken);


module.exports = router;