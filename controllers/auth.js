const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');




const login = async(req, res = response) => {

    const { password, email } = req.body;

    try {


        const usuarioDB = await Usuario.findOne({
            email
        });
        // verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            });
        }

        // verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña inválida'
            });
        }
        // generar el token JWT

        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs',
        });
    }
};

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        //si no existe el usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: ' ',
                img: picture,
                google: true

            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '';
        }
        // guardar el DB
        await usuario.save();

        // generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token no correcto',
            googleToken
        });

    }

};

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // generar JWT
    const token = await generarJWT(uid);

    // obteber usuario por uid
    usuario = await Usuario.findById(uid);


    res.json({
        ok: true,
        token,
        usuario
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};