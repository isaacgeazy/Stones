const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuario = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const Usuario = mongoose.model("usuario", usuario)

module.exports = Usuario