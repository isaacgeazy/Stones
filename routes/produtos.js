const mongoose = require("mongoose")
require("../models/produtos")
const Produtos = mongoose.model("produto")
const express = require('express')
const router = express.Router()

/* LISTAR DADOS */
router.get("/produtos", async (req, res, next) => {
    const listadeprodutos = await Produtos.find({}).lean().exec()
    res.render('produto', {
        produtos:listadeprodutos
    })
})

/* CADASTRAR */
router.get("/produtos/cadprodutos", async (req, res, next) => {
    res.render('cadproduto');
})

router.post("/produtos/cadprodutos", async (req, res, next) => {

    const dados = req.body;
    const cadprodutos = await new Produtos({
        tipo: dados.tipo,
        descricao: dados.descricao,
        valor: dados.valor
    });
    
    await cadprodutos.save()
    await res.redirect('/produtos/cadprodutos')
});

/* DELETAR */
router.get("/produtos/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const unicoprodutos = await Produtos.findById(id)
        res.render('questaodeletarprodutos', {
            unico: unicoprodutos
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/produtos/excluirItem/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        const excluirproduto = await Produtos.findByIdAndDelete(id)
        if (!excluirproduto) return res.status(404).send('Produto não existe');
        res.redirect('/produtos');
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/* EDITAR */

router.get("/produtos/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const buscar = await Produtos.findById(id)
        res.render('atualizarProdutos', {
            produtos: buscar
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

})
router.post("/produtos/editarItem/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const dados = req.body
        const editaritem = await Produtos.findByIdAndUpdate(id, {
            tipo: dados.tipo,
            descricao: dados.descricao,
            valor: dados.valor
        }, {
            new: true
        })
        await res.redirect('/produtos')

    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router