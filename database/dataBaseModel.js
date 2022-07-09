const db = require("./config");

const Post = db.sequelize.define("cadastros", {
    nome: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
    },
    senha: {
        type: db.Sequelize.STRING,
    },
    senhaToken: {
        type: db.Sequelize.STRING,
    },
    senhaTokenEspira: {
        type: db.Sequelize.DATE,
    },
});
const PostInfos = db.sequelize.define("perfilinfos", {
    email: {
        type: db.Sequelize.STRING,
    },
    vitorias: {
        type: db.Sequelize.STRING,
    },
    cartas: {
        type: db.Sequelize.STRING,
    },
    historico: {
        type: db.Sequelize.STRING,
    },
    imagem: {
        type: db.Sequelize.STRING,
    },
});

// Recriando tabela
// Post.sync({ force: true });
// PostInfos.sync({ force: true });

module.exports = {
    Post,
    PostInfos,
};
