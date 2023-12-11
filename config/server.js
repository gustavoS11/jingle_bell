module.exports = function () {
    const express = require('express')
    const consign = require('consign')
    const bodyparser = require('body-parser')
    const expressValidator = require('express-validator')
    const expressSession = require('express-session')
    const app = express();

    app.set('view engine', 'ejs')
    app.set('views','./app/view')

    app.use(bodyparser.urlencoded({extended :true}))
    app.use(expressValidator())
    app.use(express.static('app/public'))
    app.use(expressSession({
        secret:'qualquercoisa',
        resave:false,
        saveUninitialized:false
    }))
    consign()
    .include('app/rotas')
    .then('config/conexao.js')
    .then('app/model')
    .then('app/controller')
    .into(app);

    return app;
}