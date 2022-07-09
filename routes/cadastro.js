const express = require("express");
const Post = require("../database/dataBaseModel");

const router = express.Router();

router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

router.post("/cadastro", (req, res) => {
    console.log(req.body.nome);
    Post.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    })
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            res.send("Erro ao realizar cadastro", err);
        });
});
module.exports = router;
