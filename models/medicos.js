/* desestructuramos schema y model para crear el modelo */
const { Schema, model } = require("mongoose");

const medicosSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },

    img: {
        type: String

    },
    hospital: {
        required: true,
        //hacemos referencia a el hospital
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    usuario: {
        required: true,
        //hacemos referencia a el usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});
// filtrar o renombrar variables en la db
medicosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});
// exportar modelo
module.exports = model('Medico', medicosSchema);