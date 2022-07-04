const db = require("./db");

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
});

//Recriando tabela
//Post.sync({force:true})

module.exports = Post;
