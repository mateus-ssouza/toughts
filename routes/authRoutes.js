const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController');

router.get('/login', AuthController.login)
router.get('/registrar', AuthController.registrar)

module.exports = router