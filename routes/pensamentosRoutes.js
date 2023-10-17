const express = require('express')
const router = express.Router()
const PensamentoController = require('../controllers/PensamentoController');

// Helpers
const verificarAutenticacao = require('../helpers/auth').verificarAutenticacao

router.get('/criar', verificarAutenticacao, PensamentoController.criarPensamento)
router.post('/criar', verificarAutenticacao, PensamentoController.salvarPensamento)
router.get('/editar/:id', verificarAutenticacao, PensamentoController.editarPensamento)
router.post('/editar', verificarAutenticacao, PensamentoController.atualizarPensamento)
router.get('/dashboard', verificarAutenticacao, PensamentoController.dashboard)
router.post('/remover', verificarAutenticacao, PensamentoController.removerPensamento)
router.get('/', PensamentoController.mostrarTodos)

module.exports = router