const db = require('./db')
const Post = db.sequelize.define('cadastro', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.INTEGER
    }
})
module.exports = Post

