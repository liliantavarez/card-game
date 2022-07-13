/* eslint-disable consistent-return */
/* global someFunction, a */
/* eslint no-undef: "error" */
const express = require("express");

const router = express.Router();
const db = require("../database/dataBaseModel");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const user = await db.Post.findOne({
        where: { email: req.body.email },
    });
    if (req.body.email === "" || req.body.senha === "") {
        res.render("login", { message: "Informe E-mail e senha de acesso!" });
    } else if (!user) {
        res.render("login", { message: "E-mail não cadastrado" });
    } else if (user.senha !== req.body.senha) {
        res.render("login", { message: "Senha incorreta" });
    } else {
        res.redirect("/perfil");
        console.log(user)
        return user.id
    }
});

module.exports = router

