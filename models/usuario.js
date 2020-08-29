/* desestructuramos schema y model para crear el modelo */
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String

    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',

    },
    google: {
        type: Boolean,
        default: false,
    },
});
// filtrar o renombrar variables en la db
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
// exportar modelo
module.exports = model('Usuario', UsuarioSchema);