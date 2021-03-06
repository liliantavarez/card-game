/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
const express = require("express");
const bodyParse = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const router = express.Router();
const path = require("path");
const db = require("../database/dataBaseModel");

router.use(cors());
// const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, path.resolve("../public/imgs/upload"));
//     },
//     filename: (req, file, callBack) => {
//         const time = new Date().getTime();
//         callBack(null, `${time}_${file.originalname}`);
//     },
// });

// const uploud = multer({
//     storage,
// });

var idUser = "";

router.get("/perfil/:id", async (req, res) => {
    idUser = req.params.id;
    res.render("perfil");
});

router.post("/perfil/:id/novacarta", bodyParse.json(), (req, res) => {
    let carta = req.body;
    id = req.headers.referer.split("http://localhost:8081/perfil/")[1];
    db.Cartas.create({
        idUsuario: id,
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

router.get("/perfil/:id/board", async (req, res) => {
    let { id } = req.params.id;
    console.log("Board", idUser);
    console.log(id);
    let userInfos = await db.PostInfos.findOne({
        where: {
            id: idUser,
        },
    });
    res.json(JSON.stringify(userInfos));
});

router.get("/perfil/:id/cartas", async (req, res) => {
    console.log("Cartas", idUser);
    let id = req.params;
    let cartas = await db.Cartas.findAll({
        where: {
            idUsuario: idUser || id,
        },
    });
    res.json(JSON.stringify(cartas));
});

module.exports = router;
