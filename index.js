/* eslint-disable consistent-return */
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const Post = require("./modelos/Post");
const transporter = require("./modelos/sendMail");

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

app.get("/novaSenha", (req, res) => {
    res.render("novaSenha");
});

app.get("/perfil", (req, res) => {
    res.render("perfil");
});

app.post("/recSenha", async (req, res) => {
    const { emailRec } = req.body;
    try {
        const user = await Post.findOne({ where: { email: emailRec } });
        if (!user) {
            return res.status(400).send({ error: "usuario não encontrado" });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const agora = new Date();
        agora.setHours(agora.getHours() + 1);
        const usuario = await Post.findByPk(user.id);
        usuario.senhaToken = token;
        usuario.senhaTokenEspira = agora;
        usuario.save();

        transporter.sendMail(
            {
                to: emailRec,
                from: "Card Game <recsenhacardgame@gmail.com>",
                text: token,
            },
            err => {
                if (err) {
                    return res
                        .status(400)
                        .send({ error: "email não encontrado" });
                }
            },
        );
        res.redirect("/novaSenha");
    } catch (err) {
        res.status(400).send({ error: "E-mail nao cadastrado" });
    }
});

app.post("/novaSenha", async (req, res) => {
    const email = req.body.emailRec;
    const senhaToken = req.body.inputToken;
    const senha = req.body.inputPassword;

    try {
        const user = await Post.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send({ error: "usuario não encontrado" });
        }

        if (senhaToken !== user.senhaToken) {
            return res.status(400).send({ error: "token incorreto" });
        }

        const agora = new Date();

        if (agora > user.senhaTokenEspira) {
            return res
                .status(400)
                .send({ error: "token inspirado, gere um novo" });
        }

        const novaSenha = await Post.findByPk(user.id);
        novaSenha.senha = senha;
        await novaSenha.save();
        res.redirect("/");
    } catch (err) {
        res.status(400).send({ error: "falha ao resetar, tente novamente" });
    }
});

app.post("/cadastro", (req, res) => {
    Post.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
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
