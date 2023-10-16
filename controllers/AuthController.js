
module.exports = class PensamentoController {
    static login(req, res) {
        res.render('auth/login')
    }

    static registrar(req, res) {
        res.render('auth/registrar')
    }
}