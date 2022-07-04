const express = require("express");
const { engine } = require("express-handlebars");
const bcrypt = require("bcrypt")
const app = express();
const bodyParser = require("body-parser");
const Post = require("./modelos/Post");
const { transporter } = require("./modelos/sendMail");
const crypto = require('crypto')

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
app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/recSenha", (req, res) => {
    res.render("recSenha");
});

app.get("/perfil", (req, res) => {
    res.render("perfil");
});


app.post("/recSenha", async (req, res) => {
    const { emailRec } = req.body;
    try {
        const user = await Post.findOne({emailRec});

        if(!user)
            return res.status(400).send({error:"usuario não encontrado"});

        const token = crypto.randomBytes(20).toString('hex');

        const agora = new Date();
        agora.setHours(agora.getHours() + 1)
        console.log(token,agora)
        const usuario = await Post.findByPk(user.id);
        usuario.senhaToken = token;
        usuario.senhaTokenEspira = agora;
        usuario.save();

        
    } catch (err) {
        res.status(400).send({error: 'E-mail nao cadastrado'})
    }
    /*await Post.findOne({ where: { email: emailRec } })
        .then(date => {
            transporter.sendMail({
                html: `<h3>Olá, ${date.nome}</h3>
      <p>Essa é sua senha de acesso: ${date.senha}`,
                subject: "Senha de acesso CardGame",
                from: "Card Game <recsenhacardgame@gmail.com>",
                to: date.email,
            });
            res.redirect("/recSenha");
            // res.send("E-mail enviado com sucesso!")
        })
        .catch(() => {
            res.send("E-mail nao cadastrado");
        });*/
});

app.post("/cadastro", (req, res) => {
    Post.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })
        .then(() => {
            res.redirect("/");
            // res.send("Cadastro inserido no banco de dados")
        })
        .catch(err => {
            res.send("Erro ao realizar cadastro", err);
        });
});

app.listen(8081, () => {
    console.log("servidor rodando localhost:8081");
});
// localhost:8081
