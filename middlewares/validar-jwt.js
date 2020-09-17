const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const validarJWT = (req, res, next) => {
    const Usuario = require('../models/usuario')

    //leer token
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay tokens en la app'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        });

    }







};

const validarAdminRole = async(req, res, next) => {
    const uid = req.uid;
    try {
        const usuarioDB = await usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }
        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacerlo'
            });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }

};

const validarAdminRole_OMismoUsuario = async(req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB = await usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacerlo'
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }

};


module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_OMismoUsuario
};