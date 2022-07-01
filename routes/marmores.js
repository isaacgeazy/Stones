const mongoose = require("mongoose")
require("../models/marmores")
const Marmores = mongoose.model("marmores")
const express = require('express')
const router = express.Router()

/* LISTAR DADOS */
router.get("/marmore", async (req, res, next) => {
    const listademarmore = await Marmores.find({}).lean().exec()
    res.render('marmores', {
        listademarmore
    })
})

/* CADASTRAR */
router.get("/marmore/cadmarmore", async (req, res, next) => {
    res.render('cadmarmore');
})

router.post("/marmore/cadmarmore", async (req, res, next) => {

    const dados = req.body;
    const cadmarmores = new Marmores({
        tipo: dados.tipo,
        descricao: dados.descricao,
        valor: dados.valor
    });
    await cadmarmores.save()
    await res.redirect('/marmore')
});

/* DELETAR */
router.get("/marmore/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const unicomarmore = await Marmores.findById(id)
        res.render('questaodeletarmarmore', {
            unico: unicomarmore
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/marmore/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const excluirmarmore = await Marmores.findByIdAndDelete(id)
        if (!excluirmarmore) return res.status(404).send('Item não existe');
        res.redirect('/marmore');
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* EDITAR */

router.get("/marmore/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const buscar = await Marmores.findById(id)
        res.render('atualizarMarmore', {
            marmore: buscar
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

})
router.post("/marmore/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const dados = req.body
        const editaritem = await Marmores.findByIdAndUpdate(id, {
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor
        }, {
            new: true
        })
        await res.redirect('/marmore')

    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router