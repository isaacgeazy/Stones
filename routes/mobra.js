const mongoose = require("mongoose")
require("../models/mobra")
const Mobra = mongoose.model("mobra")
const express = require('express')
const router = express.Router()

/* LISTAR DADOS */
router.get("/mobra", async (req, res, next) => {
    try {
        const listademobra = await Mobra.find({}).lean().exec();
        res.render('mobra', {
            mobra:listademobra
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* CADASTRAR */
router.get("/mobra/cadmobra", async (req, res, next) => {
    res.render('cadmobra');
})

router.post("/mobra/cadmobra", async (req, res, next) => {

    const dados = req.body;
    const cadmobra = new Mobra({
        tipo: dados.tipo,
        descricao: dados.descricao,
        valor: dados.valor
    });
    await cadmobra.save()
    await res.redirect('/mobra')
});

/* DELETAR */
router.get("/mobra/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const unicomobra = await Mobra.findById(id)
        res.render('questaodeletarmobra', {
            unico: unicomobra
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/mobra/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const excluirmobra = await Mobra.findByIdAndDelete(id)
        if (!excluirmobra) return res.status(404).send('Mão de obra não existe');
        res.redirect('/mobra');
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* EDITAR */

router.get("/mobra/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const buscar = await Mobra.findById(id)
        res.render('atualizarMobra', {
            mobra: buscar
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

})
router.post("/mobra/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const dados = req.body
        const editaritem = await Mobra.findByIdAndUpdate(id, {
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor
        }, {
            new: true
        })
        await res.redirect('/mobra')

    } catch (err) {
        res.status(400).send(err.message);
    }
})


module.exports = router