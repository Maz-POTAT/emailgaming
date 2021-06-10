const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'tuktarov2121@gmail.com',
    pass: 'dsf14hgd4eGHFD',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
  }
);

module.exports = transporter