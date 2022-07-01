const mongoose = require("mongoose")
require("../models/acabamento")
const Acabamento = mongoose.model("acabamento")
const express = require('express')
const router = express.Router()

/* LISTAR DADOS */
router.get("/acabamento", async (req, res, next) => {
    const listadeacabamento = await Acabamento.find({}).lean().exec()
    res.render('acabamento', {
        acabamento:listadeacabamento
    })
})

/* CADASTRAR */
router.get("/acabamento/cadacabamento", async (req, res, next) => {
    res.render('cadacabamento');
})

router.post("/acabamento/cadacabamento", async (req, res, next) => {

    const dados = req.body;
    const cadacabamento = await new Acabamento({
        tipo: dados.tipo,
        descricao: dados.descricao,
        valor: dados.valor
    });
    
    await cadacabamento.save()
    await res.redirect('/acabamento/cadacabamento')
});

/* DELETAR */
router.get("/acabamento/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const unicoacabamento = await Acabamento.findById(id)
        res.render('questaodeletaracabamento', {
            unico: unicoacabamento
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/acabamento/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const excluiracabamento = await Acabamento.findByIdAndDelete(id)
        if (!excluiracabamento) return res.status(404).send('Acabamento não existe');
        res.redirect('/acabamento');
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* EDITAR */

router.get("/acabamento/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const buscar = await Acabamento.findById(id)
        res.render('atualizarAcabamento', {
            acabamento: buscar
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

})
router.post("/acabamento/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const dados = req.body
        const editaritem = await Acabamento.findByIdAndUpdate(id, {
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor
        }, {
            new: true
        })
        await res.redirect('/acabamento')

    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router