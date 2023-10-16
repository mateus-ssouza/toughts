const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
require('dotenv').config()

const app = express()

const conn = require('./db/conn')

// Models
const Pensamento = require('./models/Pensamento')
const Usuario = require('./models/Usuario')

// Import Routes
const pensamentosRoutes = require('./routes/pensamentosRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controllers
const PensamentoController = require('./controllers/PensamentoController');

// Template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// public path
app.use(express.static('public'))

// Flash messages
app.use(flash())

// Set sesseion to res
app.use((req, res, next) => {
    // Se usuário estiver na sessão, passar suas 
    // informações na resposta da requisição
    if (req.session.userId) {
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/pensamentos', pensamentosRoutes)
app.use('/', authRoutes)

// Página inicial
app.get('/', PensamentoController.mostrarTodos)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    }).catch((err) => {
        console.log(err)
    })