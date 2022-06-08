const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const post = require("./modelos/Post");

//config
//template engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "./views");
app.use("/public", express.static("public"));

//body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.get("/cadastro", function (req, res) {
  res.render("cadastro");
});

app.get("/", function (req, res) {
  res.render("login");
});

app.post("/save", function (req, res) {
  post
    .create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    })
    .then(() => {
      res.redirect("/");
      // res.send("Cadastro inserido no banco de dados")
    })
    .catch((err) => {
      res.send("Erro ao realizar cadastro", err);
    });

});

app.listen(8081, function () {
  console.log("servidor rodando localhost:8081");
});
//localhost:8081
