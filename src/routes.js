const express = require('express')
const ListController = require('./List/ListController')

const routes = express.Router()
const listController = new ListController()

routes.get('/List', listController.index)
routes.post('/List', listController.create)




module.exports = routes