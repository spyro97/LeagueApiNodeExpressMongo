const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('usuarios', UserSchema);