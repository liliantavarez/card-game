const nodemailer = require("nodemailer");

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

// envio
// async function run(){
//   const sendMail = await transporter.sendMail({
//     text: "Sua senha",
//     subject: 'Email de recuperação de senha',
//     from: "Card game <recsenhacardgame@gmail.com>",
//     to:  "liliancarvalhotavares@gmail.com"
//   })
// }

// run();

module.exports = {
    transporter,
};
