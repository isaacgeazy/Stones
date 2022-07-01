const mongoose = require("mongoose")
require("../models/cliente")
require("../models/cubas")
require("../models/marmores")
require("../models/acabamento")
require("../models/produtos")
require("../models/mobra")
require("../models/orcamento")
const Mobra = mongoose.model("mobra")
const Cliente = mongoose.model("cliente")
const Marmores = mongoose.model("marmores")
const Produtos = mongoose.model("produto")
const Cubas = mongoose.model("cubas")
const Acabamento = mongoose.model("acabamento")
const Orcamento = mongoose.model("orcamento")
const express = require('express')
const router = express.Router()
var moment = require('moment');

router.get("/orcamento", async (req, res, next) => {

    const lista = await Cliente.find({}).lean().exec()
    res.render('orcamento', {
        lista: lista
    })
})

// ESCOLHER ITEM DO ORÇAMENTO
router.get("/orcamento/:idcliente/addservicos", async (req, res) => {

    const cliente = req.params.idcliente
    const unicocliente = await Cliente.findById(cliente).exec()

    const listaMarmores = await Marmores.find().exec()


    res.render('addservicosorcamento', {
        cliente: unicocliente,
        marmore: listaMarmores

    })
})
router.post("/orcamento/:idcliente/addservicos", async (req, res) => {
    try {
        const cliente = req.params.idcliente
        const unicocliente = await Cliente.findById(cliente).exec()
        const dados = req.body
        const orcamento = new Orcamento({
            nome: unicocliente.nome,
            cpf: unicocliente.cpf,
            tipodepessoa: unicocliente.tipodepessoa,
            telefone: unicocliente.telefone,
            cep: unicocliente.cep,
            endereco: unicocliente.endereco,
            numero: unicocliente.numero,
            bairro: unicocliente.bairro,
            cidade: unicocliente.cidade,
            estado: unicocliente.estado,
            total: dados.total,
            nomeMarmore: dados.nomeMarmore,
            larguraMarmore: dados.larguraMarmore,
            comprimentoMarmore: dados.comprimentoMarmore,
            valorMarmore: dados.valorMarmore,
            valortotalMarmore: dados.valortotalMarmore,
            nomeMobra: dados.nomeMobra,
            larguraMobra: dados.larguraMobra,
            comprimentoMobra: dados.comprimentoMobra,
            valorMobra: dados.valorMobra,
            valortotalMobra: dados.valortotalMobra,
            nomeAcabamento: dados.nomeAcabamento,
            larguraAcabamento: dados.larguraAcabamento,
            comprimentoAcabamento: dados.comprimentoAcabamento,
            valorAcabamento: dados.valorAcabamento,
            valortotalAcabamento: dados.valortotalAcabamento,
            nomeProduto: dados.nomeProduto,
            valortotalProduto: dados.valortotalProduto,
            nomeCuba: dados.nomeCuba,
            valortotalCuba: dados.valortotalCuba

        })

        orcamento.save()
        res.redirect('/orcamento/listaOrcamento')
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/orcamento/listaOrcamento", async (req, res) => {

    const orcamento = await Orcamento.find().exec()
    res.render('tabelaOrcamento', {
        orcamento:orcamento, moment:moment
    })

})

router.get("/orcamento/listaOrcamento", async (req, res) => {

    const orcamento = await Orcamento.find().exec()
    res.render('tabelaOrcamento', {
        orcamento:orcamento, moment:moment

    })
})

router.get('/orcamento/listaOrcamento/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dados = await Orcamento.findById(id).exec()

        res.render('visualizarDetalhesOrcamento', {
            orcamento: dados, moment:moment
        })

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

})









module.exports = router