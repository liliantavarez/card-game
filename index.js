const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const Sequelize  = require("sequelize");
const bodyParser = require("body-parser");
const Post = require("./modelos/Post");
const { transporter } = require("./modelos/sendMail");

//config
//template engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "./views")
app.use('/public', express.static('public'));

//body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexão com mysql
// const sequelize = new Sequelize ('heroku_d04059a677b6d56',   'b51502a7faf26a', '27699f73', {
//     host : "us-cdbr-east-05.cleardb.net",
//     dialect: 'mysql'
// })

//rotas
app.get("/cadastro", function (req, res) {
  res.render("cadastro");
});

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/recSenha" , async function(req, res) {
  res.render('recSenha')
  //const emailRec = await Post.findOne({where: {
    //email: req.body.emailRec
  //}})
  /*if(emailRec === req.body.emailRec){
    const envia = transporter.sendMail({
      text: "Sua senha",
      subject: 'sua senha',
      from: "Card game<kelvenunes123@gmail.com>",
      to:  "kelvenunes123@gmail.com"
    })
  }*/
})
app.post("/cadastro", function (req, res) { 
  Post.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha        
    }).then(()=>{
        res.redirect('/')
        // res.send("Cadastro inserido no banco de dados")
    }).catch((err)=>{
        res.send("Erro ao realizar cadastro", err)
    })

    // let cadastro ={
    //     nome: req.body.nome,
    //     email: req.body.email,
    //     senha: req.body.senha
    // }
    // res.send(cadastro)
});





app.listen(8081, function () {
  console.log("servidor rodando localhost:8081");
});
//localhost:8081
