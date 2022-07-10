const db = require("./config");
const PerfilInfo = require('./databaseModelPerfil')


const Post = db.sequelize.define("cadastros", {
    nome: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true
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

Post.hasOne(PerfilInfo, {
    foreignKey: 'email_cadastro'
});

//Recriando tabela
//db.sequelize.sync({force: true})

module.exports = Post;


