const express = require('express')

const Router = express.Router()

const mainController = require('../controllers/main.controller.js')

Router.use((req,res,next) => {
    if(req.session.user && req.session.role == 1){
        return res.redirect('/admin')
    }
    else{
        next()
    }
})

Router.get('/', mainController.homePage)

module.exports = Router