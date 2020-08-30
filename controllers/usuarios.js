// importa los status para indicar errores (response)

const { response } = require('express');
// instalar bcrypt para encriptar contraseñas
const bcrypt = require('bcryptjs');
// importa el modelo creado en la DB
const Usuario = require('../models/usuario');
// capturamos los errores desde middleware
const { validationResult } = require('express-validator');

// GENERAR TOKEN
const { generarJWT } = require('../helpers/jwt');

// funciones

const getUsuarios = async(req, res) => {
    //paginacion
    const desde = Number(req.query.desde) || 0;

    // respuesta a la funcion get

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments(),

    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
};

const crearUsuarios = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        // verificación del email para que no se repita
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
        }
        // crear un nuevo usuario
        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // guardar en base de datos
        await usuario.save();
        //generar JWT
        const token = await generarJWT(usuario.id);

        // solo se puede enviar las respuesta .json una vez

        res.json({
            ok: true,
            usuario,
            token
        });
        // manejo del error general
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs',
        });
    }
};

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id',
            });
        }
        //TO-DO: validar token y comprobar si es el usuario correcto
        // actualizaciones
        const {
            password,
            google,
            email,
            ...campos
        } = req.body;

        if (usuariodb.email !== email) {
            const existeEmail = await Usuario.findOne({
                email
            });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'email ya existente'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
            new: true,
        });

        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
};

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id',
            });
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'usuario eliminado'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }

};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
};