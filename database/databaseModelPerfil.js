const db = require("./config");

const PerfilInfo = db.sequelize.define("perfilInfo", {
    email_cadastro: {
        type: db.Sequelize.STRING,
    },
    vitorias:{
        type: db.Sequelize.STRING,
        allowNull:true
    },
    cartas: {

        type: db.Sequelize.STRING,
        allowNull: true,
            
        },
    historico: {
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    imagem: {
        type: db.Sequelize.STRING,
        allowNull: true,
    }
  
    
});

module.exports = PerfilInfo;