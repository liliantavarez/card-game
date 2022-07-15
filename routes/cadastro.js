const express = require("express");
const db = require("../database/dataBaseModel");

const router = express.Router();

router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

router.post("/cadastro", (req, res) => {
    db.PostInfos.create({
        email: req.body.email,
    })
        .then(() => {
            db.Post.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            })
                .then(() => {
                    res.redirect("/");
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});
module.exports = router;
