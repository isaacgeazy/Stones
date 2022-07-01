const mongoose = require("mongoose")
require("../models/despesas")
const express = require('express')
const router = express.Router()
const Despesas = mongoose.model("despesas")
const upload = require("../config/configMulter")


router.get('/despesas', async (req, res) => {
    res.render('despesas')
})


router.post('/despesas', upload.single("image"), async (req, res) => {

    try {
        if (!req.body.tipo == null || req.body.tipo != undefined &&
            !req.body.data == null || req.body.data != undefined &&
            !req.file.filename == null || req.file.filename != undefined &&
            !req.body.status == null || req.body.status != undefined) {

            const despesa = new Despesas({
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                data: req.body.data,
                image: req.file.filename,
                status: req.body.status
            })
            despesa.save()
            res.status(201).redirect('/despesas')

        }
    } catch (err) {
        res.status(400).send(err);
    }

})

router.get('/despesas/lista', async (req, res) => {
    try {
        const listartodos = await Despesas.find().exec()
        const listarpagos = await Despesas.find({
            status: "Pago"
        }).exec()
        const listarpendentes = await Despesas.find({
            status: "Pendente"
        }).exec()

        res.render('lista', {
            todos: listartodos,
            pagos: listarpagos,
            pendentes: listarpendentes

        })
    } catch (err) {
        res.status(404)
    }
})

router.get('/despesas/lista/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dados = await Despesas.findById(id).exec()

        res.render('unicadespesa', {
            despesa: dados
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

})

router.get('/despesas/lista/excluir/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pegardado = await Despesas.findById(id);
        res.render('excluirDespesa', {
            unico: pegardado
        })
    } catch (err) {
       
        res.status(404).send(err.message);
    }
})

router.post("/despesas/lista/excluir/:id", async (req, res) => {
    try {
        const id = req.params.id
        const excluirdado = await Despesas.findByIdAndDelete(id)
        if (!excluirdado) return res.status(404).send('Não foi possivel excluir!');
         res.redirect('/despesas/lista')
    } catch (err) {
        res.status(404).send(err.message);
    }
})


module.exports = router