/* eslint-disable consistent-return */
const express = require("express");
const crypto = require("crypto");
const transporter = require("../modelos/sendMail");
const Post = require("../database/dataBaseModel");

const router = express.Router();

function sendEmail(emailRec, token) {
    transporter.sendMail({
        from: "Card Game <recsenhacardgame@gmail.com>",
        to: emailRec,
        subject: "Token de recuperação de senha",
        text: token,
    });
}

router.get("/recSenha", (req, res) => {
    res.render("recSenha");
});

router.post("/recSenha", async (req, res) => {
    console.log(req.body);
    const { emailRec } = req.body;
    try {
        const user = await Post.findOne({ where: { email: emailRec } });
        if (!user) {
            res.render("recSenha", { message: "Usuario não encontrado" });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const agora = new Date();
        agora.setHours(agora.getHours() + 1);
        const usuario = await Post.findByPk(user.id);
        usuario.senhaToken = token;
        usuario.senhaTokenEspira = agora;
        usuario.save();
        sendEmail(emailRec, token);
        res.redirect("/novaSenha");
    } catch (err) {
        res.render("recSenha", { message: "E-mail não cadastrado" });
    }
});

module.exports = router;
