const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');




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

module.exports = {
    login
};