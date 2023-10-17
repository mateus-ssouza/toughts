// Verificar se o usuáro está autenticado
// Caso não esteja logado, redirecionar para página de login
module.exports.verificarAutenticacao = function (req, res, next) {

    const userId = req.session.userid

    if (!userId) res.redirect('/login')

    next()
}