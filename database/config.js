const Sequelize = require("sequelize");
// conexão com mysql
const sequelize = new Sequelize(
    "heroku_d04059a677b6d56",
    "b51502a7faf26a",
    "27699f73",
    {
        host: "us-cdbr-east-05.cleardb.net",
        dialect: "mysql",
    },
);

module.exports = {
    Sequelize,
    sequelize,
};
