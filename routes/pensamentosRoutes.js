const express = require('express')
const router = express.Router()
const PensamentoController = require('../controllers/PensamentoController');

router.get('/', PensamentoController.mostrarTodos)

module.exports = router