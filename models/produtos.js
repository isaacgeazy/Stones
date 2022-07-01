const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const produto = new Schema({
    
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


const Produtos = mongoose.model("produto", produto)
module.exports = Produtos