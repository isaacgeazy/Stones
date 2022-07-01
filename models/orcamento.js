const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const orcamento = new Schema({

    nome:{
        type: String
    },
    cpf: {
        type: String,
        required: true
    },
    tipodepessoa: {
        type: String,
        required: true
    },
    telefone: {
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
    total: {
        type: String
    },
    nomeMarmore: {
        type: String
    },
    larguraMarmore: {
        type: String
    },
    comprimentoMarmore: {
        type: String
    },
    valorMarmore: {
        type: String

    },
    valortotalMarmore: {
        type: String

    },
    nomeMobra: {
        type: String

    },
    larguraMobra: {
        type: String

    },
    comprimentoMobra: {
        type: String
    },
    valorMobra: {
        type: String

    },
    valortotalMobra: {
        type: String

    },
    nomeAcabamento: {
        type: String

    },
    larguraAcabamento: {
        type: String

    },
    comprimentoAcabamento: {
        type: String
    },
    valorAcabamento: {
        type: String

    },
    valortotalAcabamento: {
        type: String

    },
    nomeProduto: {
        type: String
    },
    valortotalProduto: {
        type: String

    },
    nomeCuba: {
        type: String
    },
    valortotalCuba: {
        type: String

    },
    date: {
        type: Date,
        default: Date()
    }

});

const Orcamentos = mongoose.model("orcamento", orcamento)
module.exports = Orcamentos