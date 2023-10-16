const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Usuario = require('./Usuario')

const Pensamento = db.define('Pensamento', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})

Pensamento.belongsTo(Usuario)
Usuario.hasMany(Pensamento)

module.exports = Pensamento