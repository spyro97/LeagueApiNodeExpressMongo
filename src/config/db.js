const mongoose = require('mongoose');
require('dotenv/config');
module.exports = {
    conectDB: function () {
        try {
            mongoose.connect( process.env.DB_CONECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
            console.log("connected"));    
        }catch (error) { 
            console.log("could not connect", error);
        }
    }
}