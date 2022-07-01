const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const marmores = new Schema({
    
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Decimal128,
        required:true
    }
});


const Marmores = mongoose.model("marmores", marmores)
module.exports = Marmores