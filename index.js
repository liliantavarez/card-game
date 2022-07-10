/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const bodyParser = require("body-parser");
const recSenhaRoute = require("./routes/recSenha");
const cadastroRoute = require("./routes/cadastro");
const novaSenhaRoute = require("./routes/novaSenha");
const PerfilRooute = require('./routes/perfil')
const modelDataBase = require("./database/dataBaseModel");
const Post = require("./database/dataBaseModel");


// config
// template engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "./views");
app.use("/public", express.static("public"));

// body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas

app.use("/", recSenhaRoute);
app.use("/", cadastroRoute);
app.use("/", novaSenhaRoute);
app.use("/", PerfilRooute);

app.get("/", (req, res) => {
    res.render("login");
});

/*app.get("/perfil", (req, res) => {
    res.render("perfil");
});*/

app.post("/", async (req, res) => {
    const user = await Post.findOne({ where: { email: req.body.email } });
    
    if (req.body.email === "" || req.body.senha === "") {
        res.render("login", { message: "Informe E-mail e senha de acesso!" });
    } else {
        if (!user) {
            res.render("login", { message: "E-mail não cadastrado" });
        } else if (user.senha !== req.body.senha) {
            res.render("login", { message: "Senha incorreta" });
        } else {
            res.redirect("/perfil");
            return user.id;
        }
    }
});

app.listen(8081, () => {
    console.log("servidor rodando localhost:8081");
});
// localhost:8081
