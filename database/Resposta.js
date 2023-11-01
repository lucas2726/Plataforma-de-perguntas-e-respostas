const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER, //Para só aceitar números inteiros
        allowNull: false
    }
})

Resposta.sync({force: false}).then(() => { //Para sincronizar com o banco de dados
    console.log("Tabela criada!") //Para criar uma tabela e verificar se ela já existe
}) 

module.exports = Resposta