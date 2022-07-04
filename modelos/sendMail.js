const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars")
const path =  require("path")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "recsenhacardgame@gmail.com",
        pass: "igndbjkfiujtrevu",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./public/mail'),
    extName:'html'
}));
module.exports = {
    transporter,
};
