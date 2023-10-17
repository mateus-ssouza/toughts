const Pensamento = require('../models/Pensamento')
const Usuario = require('../models/Usuario')

const { Op } = require('sequelize')

module.exports = class PensamentoController {
    static async mostrarTodos(req, res) {

        let busca = ''

        if (req.query.busca) busca = req.query.busca

        let ordem = 'DESC'

        if(req.query.ordem == 'antigo') ordem = 'ASC'
        else ordem = 'DESC'

        const todosOsPensamentos = await Pensamento.findAll({
            include: Usuario,
            where: {
                titulo: { [Op.like]: `%${busca}%` }
            },
            order: [['createdAt', ordem]]
        })

        const pensamentos = todosOsPensamentos.map((resultado) => resultado.get({ plain: true }))

        let qtdPensamentos = pensamentos.length

        if (qtdPensamentos == 0) {
            qtdPensamentos = false
        }

        res.render('pensamentos/home', { pensamentos, busca, qtdPensamentos })
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

        let listaVaziaPensamentos = false

        if (pensamentos.length === 0) {
            listaVaziaPensamentos = true
        }

        res.render('pensamentos/dashboard', { pensamentos, listaVaziaPensamentos })
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

    static async removerPensamento(req, res) {
        const id = req.body.id
        const usuarioId = req.session.userid

        try {

            await Pensamento.destroy({ where: { id: id, UsuarioId: usuarioId } })

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (err) {
            console.log(`Ocorreu um erro: ${err}`)
        }
    }

    static async editarPensamento(req, res) {
        const id = req.params.id

        const pensamento = await Pensamento.findOne({ where: { id: id }, raw: true })

        res.render('pensamentos/editar', { pensamento })
    }

    static async atualizarPensamento(req, res) {

        const id = req.body.id

        const pensamento = {
            titulo: req.body.titulo,
            UsuarioId: req.session.userid
        }

        try {

            await Pensamento.update(pensamento, { where: { id: id } })

            req.flash('message', 'Pensamento editado com sucesso!')

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })

        } catch (err) {
            console.log(`Ocorreu um erro: ${err}`)
        }
    }
}