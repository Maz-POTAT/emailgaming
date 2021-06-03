const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'jackie.devil001@gmail.com',
    pass: 'pooh1998625',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
  }
);

module.exports = transporter