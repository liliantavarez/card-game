const express = require("express");
const Post = require("../database/dataBaseModel");
const PostPerfil = require("../database/databaseModelPerfil")

const router = express.Router();

router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

router.post("/cadastro", async(req, res) => {

    
    Post.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        
    })
    PostPerfil.create({
        email_cadastro:req.body.email,
        vitorias:req.body.senha
    })
    
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(400).send("Erro ao realizar cadastro", err);
        });
});
module.exports = router;
