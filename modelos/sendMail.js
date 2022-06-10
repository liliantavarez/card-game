const nodemailer = require("nodemailer");


//recsenha
//lembrar de mudar as configs pra verificar a senha no banco e enviar pro email
//por favor não hackeia meu email :((((((
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user:"kelvenunes123@gmail.com",
    pass:"fvenckmrtrrseerr"
  },
  tls: {
    rejectUnauthorized: false
  }
})
//envio
/*async function run(){
  const sendMail = await transporter.sendMail({
    text: "Sua senha",
    subject: '',
    from: "Card game<kelvenunes123@gmail.com>",
    to:  "kelvenunes123@gmail.com"
  })
    
}
  
run();*/

module.exports = {
    transporter: transporter
}