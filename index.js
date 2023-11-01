const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database") //Para importar a biblioteca
const Pergunta = require("./database/Pergunta") //Para importar o banco de dados js
//database
connection
      .authenticate()
      .then(() => {
          console.log("Conexão feita com o banco de dados")
      })
      .catch((msgErro) => {
        console.log("ERRO!")
      })
//Esstou dizendo para o express usar o EJS como view engine
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

    Pergunta.create({ //Pata conectar com a const Pergunta
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/") //Para redirecionar para a pagina principal
    })
})

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id;
    Pergunta.findOne({ //Para fazer uma busca no mySQL
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) { //encontrada
          res.render("pergunta", {
            pergunta: pergunta
          })
        } else { //Não encontrada
            res.redirect("/") //Para redirecionar para outra pagina
        }
    })
})

app.listen(8080, () => {console.log("App rodando!")})






