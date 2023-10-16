const Pensamento = require('../models/Pensamento')
const Usuario = require('../models/Usuario')

module.exports = class PensamentoController {
    static async mostrarTodos(req, res) {
        res.render('pensamentos/home')
    }
}