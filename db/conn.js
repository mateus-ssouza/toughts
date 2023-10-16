const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('toughts', process.env.DB_NAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Banco conectado com sucesso!')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize