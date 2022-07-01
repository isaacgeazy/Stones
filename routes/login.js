
const bcrypt = require('bcrypt')
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require("mongoose")
require("../models/login")
const Usuario = mongoose.model("usuario")

const router = express.Router()

router.use(bodyparser.urlencoded({
    extended: false
}))
router.use(bodyparser.json());


router.get("/cadastrar", async (req, res) => {
    res.render('cadastrar')
})

router.post('/cadastrar', async (req, res) => {

    var erros = []
    var dados = req.body;
    if (!dados.username || typeof dados.username == undefined || dados.username == null) {
        erros.push({
            texto: "Nome inválido"
        })
    }
    if (!dados.email || typeof dados.email == undefined || dados.email == null) {
        erros.push({
            texto: "Email inválido"
        })
    }
    if (dados.password.length <= 7) {
        erros.push({
            texto: "Senha muito pequena"
        })
    }
    if (typeof dados.password == undefined || dados.password == null) {
        erros.push({
            texto: "Senha inválida"
        })
    }

    if (erros.length > 0) {
        res.render('cadastrar', {
            erros: erros
        })
    } else {

        dados.password = await bcrypt.hash(dados.password, 10)

        const usuario = await new Usuario({
            username: dados.username,
            email: dados.email,
            password: dados.password
        })
        usuario.save()
        console.log(dados)
        await res.redirect('/login')
    }

})





module.exports = router