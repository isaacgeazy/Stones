// Modulos
const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const passport = require("passport");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Rotas
const usuario = require('./routes/login');
const cliente = require('./routes/cliente');
const orcamento = require('./routes/orcamento');
const marmores = require('./routes/marmores');
const mobra = require('./routes/mobra');
const acabamento = require('./routes/acabamento');
const cubas = require('./routes/cubas');
const produtos = require('./routes/produtos');
const despesas = require('./routes/despesas')

// Model
const User = require('./models/login')

// Mongoose

var query = 'mongodb+srv://isaacgeazy:Encantado123!@stones.k91oj9u.mongodb.net/?retryWrites=true&w=majority'
const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Conectado com Atlas Mongodb")
    }
});

// EJS
app.set('view engine', 'ejs');

app.use(express.static('public'));

//Session
app.use(session({
    secret: "techinside123",
    resave: false,
    saveUninitialized: true

}))

var PORT = process.env.PORT || 3000;

// Body-parser
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());
app.use(express.json());

// Passport.js AUTH USER

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {
                    message: "Nome de usuario incorreto!"
                });
            };
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err);
                if (res === false) {
                    return done(null, false, {
                        message: "Senha incorreta!"
                    });
                }
                return done(null, user);
            });
        });
    }

))

function estaLogado(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function NaoEstaLogado(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/menu')
}
app.get("/menu", estaLogado, async (req, res) => {
    res.render('menu')
})

app.get("/login", NaoEstaLogado, async (req, res, next) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect: '/login?error=true'
}))

app.get('/sair', function (req, res) {
    req.logout();
    res.redirect('/login')
})

// Rotas

app.get("/suporte", function (req, res) {
    res.render('suporte')
})

app.get("/servico", async (req, res) => {
    res.render('servico')
})

app.get("/perfil", function (req, res) {
    res.render('perfil')
})

app.get("/contato", function (req, res) {
    res.render('contato')
})

app.get("/", async (req, res) => {
    res.render('initialpage')
})

app.use(usuario)
app.use(cliente)
app.use(orcamento)
app.use(marmores)
app.use(mobra)
app.use(acabamento)
app.use(cubas)
app.use(produtos)
app.use(despesas)

app.listen(PORT, () => {
    console.log("Funcionando na porta http://localhost:" + PORT);
});