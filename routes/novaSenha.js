/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
const express = require("express");
const router = express.Router();
const Post = require("../modelos/Post");

router.get("/novaSenha", (req, res) => {
    res.render("novaSenha");
});

router.post("/novaSenha", async (req, res) => {
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

module.exports = router;
