const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cliente = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    tipodepessoa: {
        type: String,
        required: true
    },
    dtnasc: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   cep: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
   numero: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date()
    }

})

const Clientes = mongoose.model("cliente", cliente)

module.exports = Clientes