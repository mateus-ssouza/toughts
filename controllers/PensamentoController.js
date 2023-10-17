const Pensamento = require('../models/Pensamento')
const Usuario = require('../models/Usuario')

module.exports = class PensamentoController {
    static async mostrarTodos(req, res) {
        res.render('pensamentos/home')
    }

    static async dashboard(req, res) {
        res.render('pensamentos/dashboard')
    }

    static criarPensamento(req, res) {
        res.render('pensamentos/criar')
    }

    static async salvarPensamento(req, res) {

        const pensamento = {
            titulo: req.body.titulo,
            UsuarioId: req.session.userid
        }

        try {

            await Pensamento.create(pensamento)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })

        } catch (err) {
            console.log(`Ocorreu um erro: ${err}`)
        }
    }
}