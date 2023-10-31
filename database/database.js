//Para exportar a biblioteca
const sequelize = require('sequelize')

//Para fazer a conexão com o banco de dados
const connection = new sequelize('guiaperguntas', 'root', 'root', /*Nome do banco de dados, usúario e senha */ {
    host: 'localhost', //Onde está rodando,
    dialect: 'mysql' //Nome de qual banco de dados está rodando
})

module.exports = connection