const { response } = require('express');






const subirArchivo = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ('hospitales', 'medicos', 'usuarios');
    if (!tiposValidos.includes(tipo)) {

        return res.status(500).json({
            ok: false,
            msg: 'no es un medico, usuario o hospital'
        });
    }
    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subió ningún archivo'
        });
    }

    // procesar la imagen

    res.json({
        ok: true,
        msg: 'works'
    });


};












module.exports = {
    subirArchivo
};