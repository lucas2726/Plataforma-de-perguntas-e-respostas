const Sequelize = require("sequelize")
const connection = require("./database")

const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING, //STRING é para textos curtos
        allowNULL: false //Nunca vai ficar nulo o banco de dados
    },
    descricao:{
        type: Sequelize.TEXT, //Para textos longos
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(() => { //Para sincronizar com o banco de dados
     console.log("Tabela criada!")
}) 

module.exports = Pergunta //Para exportar a tag pergunta