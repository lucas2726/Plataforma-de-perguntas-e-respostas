/*//Para exportar a biblioteca
const sequelize = require('sequelize')

//Para fazer a conexão com o banco de dados
const connection = new sequelize('guiaperguntas', 'root', 'root', Nome do banco de dados, usúario e senha  {
    host: 'localhost', //Onde está rodando,
    dialect: 'mysql',//Nome de qual banco de dados está rodando
    logging: false
})

module.exports = connection*/

const { Sequelize } = require('sequelize');

let connection;

if (process.env.DATABASE_URL) {
  // Configuração para ambiente do Heroku com variável de ambiente DATABASE_URL
  connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Configuração para ambiente local
  connection = new Sequelize('guiaperguntas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });
}

module.exports = connection;