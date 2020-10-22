const express = require('express')
const ListController = require('./Controllers/ListController')
const ItemController = require('./Controllers/ItemController')
const SubitemController = require('./Controllers/SubitemController')

const routes = express.Router()
const listController = new ListController()
const itemController = new ItemController()
const subitemController = new SubitemController()

routes.get('/List', listController.index)
routes.post('/List', listController.create)
roures.get('/List/:id', listController.show)

routes.get('/item/:id', itemController.toggle)
routes.post('/item', itemController.create)
routes.delete('/item/:id', itemController.delete)

routes.get('/subitem/:id', subitemController.toggle)
routes.post('/subitem', subitemController.create)
routes.delete('/subitem/:id', subitemController.delete)




module.exports = routes