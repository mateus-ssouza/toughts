const Usuario = require('../models/Usuario')

const bcrypt = require('bcryptjs')

module.exports = class PensamentoController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, senha } = req.body

        // Verificar usuário
        const usuario = await Usuario.findOne({ where: { email: email } })

        if (!usuario) {
            req.flash('message', 'Email não cadastrado!')
            res.render('auth/login')
            return
        }

        // Verificar senha
        const passwordMatch = bcrypt.compareSync(senha, usuario.senha)

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')
            return
        }

        // Iniciar sessão
        req.session.userid = usuario.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static registrar(req, res) {
        res.render('auth/registrar')
    }

    static async registrarPost(req, res) {
        const { nome, email, senha, confirmasenha } = req.body

        // Validar senha
        if (senha != confirmasenha) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/registrar')
            return
        }

        // Verificar se o usuário existe
        const verifiqueSeUsuarioExiste = await Usuario.findOne({ where: { email: email } })

        if (verifiqueSeUsuarioExiste) {
            req.flash('message', 'O email já está em uso!')
            res.render('auth/registrar')
            return
        }

        // Criação da senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const usuario = {
            nome,
            email,
            senha: hashedPassword
        }

        try {
            const usuarioCriado = await Usuario.create(usuario)

            req.session.userid = usuarioCriado.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (err) {
            console.log(`Ocorreu um erro: ${err}`)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}