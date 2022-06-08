const nodemailer = require("nodemailer");

let transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:"kelvenunes123@gmail.com",
      pass: "fvenckmrtrrseerr"
    }  
  })
  
  //colocar no index depois de verificar no BD
  /*transporter.sendMail({
    from: "Card game<kelvenunes123@gmail.com>",
    to: "@liliancristianecarvalhotavares",
    subject: "Me avisa se chegou pra tu sapatão",
    text: "Se der certo vou subir",
    html:"bjs :v"
  
  })*/