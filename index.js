const express = require("express")
const app = express()

//Estou dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')
//Estou dizendo para o express que quero usar aquivos estáticos
app.use(express.static('public'))

app.get("/", (req, res) => {
    
    res.render("index", {
        
    })
})

app.listen(8080, () => {console.log("App rodando!")})





