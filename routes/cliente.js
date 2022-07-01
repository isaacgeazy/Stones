const mongoose = require("mongoose")
require("../models/cliente")
const Cliente = mongoose.model("cliente")
const express = require('express')
const router = express.Router()

router.get("/cliente/cadcliente", async (req, res) => {

  res.render('cliente')

})

router.post("/cliente/cadcliente", async (req, res) => {

  const cliente = new Cliente({
    nome: req.body.nome,
    cpf: req.body.cpf,
    tipodepessoa: req.body.tipodepessoa,
    dtnasc: req.body.dtnasc,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    cep: req.body.cep,
    endereco: req.body.endereco,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado

  })
  console.log(cliente)
  await cliente.save()
  res.redirect("/cliente/cadcliente")
})

router.get('/cliente', async (req, res, next) => {

  const lista = await Cliente.find({}).lean().exec()
  res.render('buscarcliente', {
    list: lista

  })
})

router.get("/cliente/atualizarCliente/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const updtCliente = await Cliente.findById(id).exec()
    res.render('atualizarCliente', {
      cliente: updtCliente
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.post("/cliente/atualizarCliente/:id", async (req, res, next) => {

  const id = req.params.id;
  const data = req.body;

  await Cliente.findByIdAndUpdate(id, {
    nome: data.nome,
    sobrenome: data.sobrenome,
    cpf: data.cpf,
    tipodepessoa: data.tipodepessoa,
    dtnasc: data.dtnasc,
    cpf: data.cpf,
    telefone: data.telefone,
    email: data.email,
    cep: data.cep,
    endereco: data.endereco,
    numero: data.numero,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado
  }, {
    new: true
  });

  await res.redirect('/cliente')
})

router.get('/cliente/deletarCliente/:id', async (req, res, next) => {
  const id = req.params.id;
  const deletarcliente = await Cliente.findById(id).lean().exec()
  
  res.render('questaodeletarcliente', {
    cliente: deletarcliente
  })

  router.post('/cliente/deletarCliente/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const cliente = await Cliente.findByIdAndDelete(id);
      if (!cliente) return res.status(404).send('Cliente não existe');
      res.redirect('/cliente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

})

module.exports = router