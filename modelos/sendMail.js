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
async function run(){
  const sendMail = await transporter.sendMail({
    
    text: "Se der certo vou subir",
    subject: "Me avisa se chegou pra tu sapatão",
    from: "Card game<kelvenunes123@gmail.com>",
    to:  "kelvenunes123@gmail.com"
    
  })
  
}
run();

module.exports = {
    transporter: transporter
}