const express = require("express") //Para chamar o express instalado
const app = express() //Para inicializar o express
const bodyParser = require("body-parser") //Para conseguir acessar os elementos html, pelo req.body
const connection = require("./database/database") //Para importar o database
const Pergunta = require("./database/Pergunta") //Para importar o banco de dados Pergunta
const Resposta = require("./database/Resposta") //Para importar o banco de dados Resposta
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
app.use(bodyParser.urlencoded({extended: false})) //Para analisar os dados do html e só aceitar array e string
app.use(bodyParser.json()) //Para analisar os dados do html e tronar-los disponiveis no req.body
//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw:true, order:[/*findAll: Serve para fazer uma pesquisa no mySQL.ASC crescente / DESK decrescente / Raw é para fazer um pesquisa mais limpa e order é para colocar na order desejada*/
        ['id','DESC']
    ]}).then(perguntas => {  
    res.render("index", { //Res.render serve para enviar uma resposta para o html
        perguntas: perguntas
    })
    })
})


app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo //Para traser para o node o name do html
    let descricao = req.body.descricao //Para traser para o node o name do html
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
            where:{perguntaId: pergunta.id}, //Para dizer oque vc quer buscar no mySQL
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
    Resposta.create({ //Serve para cria os dados no bd
        corpo: corpo,//Para conectar com o banco de dados, nesse caso: Resposta
        perguntaId: perguntaId //Para conectar com o banco de dados, nesse caso: Resposta
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)//Para redirecionar para a pg pergunta + o id da pergunta
    })
})
app.listen(8080, () => {console.log("App rodando!")})








