const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database") //Para importar a biblioteca
const Pergunta = require("./database/Pergunta") //Para importar o banco de dados js
const Resposta = require("./database/Resposta") //Para importar a resposta 
//database
connection
      .authenticate()
      .then(() => {
          console.log("Conexão feita com o banco de dados")
      })
      .catch((msgErro) => {
        console.log("ERRO!")
      })
//Estou dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw:true, order:[/*ASC crescente / DESK decrescente / Raw é para fazer um pesquisa mais limpa*/
        ['id','DESC']
    ]}).then(perguntas => { //Para buscar dados. 
    res.render("index", {
        perguntas: perguntas
    })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    Pergunta.create({ //Pata conectar com a const Pergunta que está conectada com o BD
        titulo: titulo, //Para conectar com o banco de dados, nesse caso: Pergunta
        descricao: descricao //Para conectar com o banco de dados, nesse caso: Pergunta
    }).then(() => {
        res.redirect("/") //Para redirecionar para a pagina principal
    })
})

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id;
    Pergunta.findOne({ //Para fazer uma busca no mySQL
        where: {id: id} //A busca será do id
    }).then(pergunta => {
        if (pergunta != undefined) { //encontrada
          Resposta.findAll({
            where:{perguntaId: pergunta.id},
            order:[['id', 'DESC']]
          }).then(respostas => {
            res.render("pergunta", { //Para pegar no html as respostas
                pergunta: pergunta,
                respostas: respostas
              })
          })
        } else { //Não encontrada
            res.redirect("/") //Para redirecionar para outra pagina, nessa caso a inicial
        }
    })
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo//Para conectar com o html
    let perguntaId = req.body.pergunta//Para conectar com o html
    Resposta.create({
        corpo: corpo,//Para conectar com o banco de dados, nesse caso: Resposta
        perguntaId: perguntaId //Para conectar com o banco de dados, nesse caso: Resposta
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)//Para redirecionar para a pg pergunta + o id da pergunta
    })
})
app.listen(8080, () => {console.log("App rodando!")})








