const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tokens', RefreshTokenSchema);