const mongoose = require('mongoose');

const ChampionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    rol_primario: {
        type: String,
        required: true
    },
    rol_secundario: {
        type: String,
        required: false,
        default: 'Sin rol secundario.'
    },
    fecha_subido: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('campeones', ChampionSchema);