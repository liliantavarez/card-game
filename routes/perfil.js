/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
const express = require("express");
const bodyParse = require("body-parser");

const router = express.Router();
const db = require("../database/dataBaseModel");

var idUser = "";

router.get("/perfil", (req, res) => {
    res.render("perfil");
});

router.get("/perfil/:id", async (req, res) => {
    idUser = req.params.id;
    res.render("perfil");
});

router.post("/perfil/:id/novacarta", bodyParse.json(), async (req, res) => {
    let carta = req.body;
    db.Cartas.create({
        idUsuario: idUser,
        nome: carta.nome,
        ataque: carta.ataque,
        defesa: carta.defesa,
        magia: carta.magia,
        imagem: carta.imagem,
    })
        .then(() => {
            res.redirect(`/perfil/${idUser}`);
        })
        .catch(err => {
            res.send(err);
        });
});
router.get("/perfil/:id/cartas", async (req, res) => {
    let { id } = req.params;
    console.log(idUser);
    console.log(id);
    let cartas = await db.Cartas.findAll({
        where: {
            idUsuario: idUser || id,
        },
    });
    res.json(JSON.stringify(cartas));
});

module.exports = router;
