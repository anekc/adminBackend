/* desestructuramos schema y model para crear el modelo */
const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },

    img: {
        type: String

    },
    usuario: {
        required: true,
        //hacemos referencia a el usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });
// filtrar o renombrar variables en la db
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});
// exportar modelo
module.exports = model('Hospital', HospitalSchema);