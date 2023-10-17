const Pensamento = require('../models/Pensamento')
const Usuario = require('../models/Usuario')

module.exports = class PensamentoController {
    static async mostrarTodos(req, res) {
        res.render('pensamentos/home')
    }

    static async dashboard(req, res) {

        const usuarioId = req.session.userid

        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            },
            include: Pensamento,
            plain: true
        })

        // Verificar usuário
        if (!usuario) {
            res.redirect('/login')
        }

        const pensamentos = usuario.Pensamentos.map((resultado) => resultado.dataValues)

        res.render('pensamentos/dashboard', { pensamentos })
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