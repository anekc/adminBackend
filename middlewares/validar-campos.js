//importar response de express

const { response } = require('express');
const { validationResult } = require('express-validator');

// funcion de validacion
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    // si pasa las validaciones llamamos a next
    next();

};
// exportamos modulos
module.exports = {
    validarCampos
};