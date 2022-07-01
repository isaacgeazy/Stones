const mongoose = require("mongoose")
require("../models/cubas")
const Cubas = mongoose.model("cubas")
const express = require('express')
const router = express.Router()

/* LISTAR DADOS */
router.get("/cubas", async (req, res, next) => {
    const listadecubas = await Cubas.find({}).lean().exec()
    res.render('cubas', {
        cubas:listadecubas
    })
})

/* CADASTRAR */
router.get("/cubas/cadcubas", async (req, res, next) => {
    res.render('cadcubas');
})

router.post("/cubas/cadcubas", async (req, res, next) => {

    const dados = req.body;
    const cadcubas = await new Cubas({
        tipo: dados.tipo,
        descricao: dados.descricao,
        valor: dados.valor
    });
    
    await cadcubas.save()
    await res.redirect('/cubas/cadcubas')
});

/* DELETAR */
router.get("/cubas/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const unicocubas = await Cubas.findById(id)
        res.render('questaodeletarcubas', {
            unico: unicocubas
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/cubas/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const excluircubas = await Cubas.findByIdAndDelete(id)
        if (!excluircubas) return res.status(404).send('Cubas não existe');
        res.redirect('/cubas');
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* EDITAR */

router.get("/cubas/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const buscar = await Cubas.findById(id)
        res.render('atualizarCubas', {
            cubas: buscar
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

})
router.post("/cubas/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const dados = req.body
        const editaritem = await Cubas.findByIdAndUpdate(id, {
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor
        }, {
            new: true
        })
        await res.redirect('/cubas')

    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router