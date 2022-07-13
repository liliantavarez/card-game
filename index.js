/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const bodyParser = require("body-parser");
const recSenhaRoute = require("./routes/recSenha");
const cadastroRoute = require("./routes/cadastro");
const novaSenhaRoute = require("./routes/novaSenha");
const loginRoute = require("./routes/login");
const modelDataBase = require("./database/dataBaseModel");
const perfilRoute = require("./routes/perfil")

// config
// template engine
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
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
app.use("/", loginRoute);
app.use("/", perfilRoute)

app.get("/perfil", (req, res) => {
    res.render("perfil");
    console.log(req);
});

app.listen(process.env.PORT || 8081, () => {
    console.log("servidor rodando localhost:8081");
});
// localhost:8081
