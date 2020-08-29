const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {


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



module.exports = {
    validarJWT
};