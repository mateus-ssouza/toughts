const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Usuario = db.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

module.exports = Usuario