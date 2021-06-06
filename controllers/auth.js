const User = require("../model/users");
const crypto = require("./crypto");
const transporter = require("./mailserver");
const { validationResult } = require("express-validator");
var generator = require('generate-password');

exports.postSendPassword = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } })
  .then((user) => {
    if (!user) {
      let newPassword = generator.generate({
        length: 10,
        numbers: true
      });
      user = new User({
        email: email,
        password: newPassword
      });
      if(!user.save())
        return res.status(422).json( {errorMessage: "Failed to send password!"});
    }
    transporter.sendMail({
      to: email,
      from: "jackie.devil001@gmail.com",
      subject: "Emailgaming",
      html: "<h1>Your email is" + user.password + "</h1>"
    });
    return res.status(200);
  })
  .catch((err) => {return res.status(422).json( {errorMessage: err.message});});
};

exports.postLogin = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({success: false, reason: 'Invalid username or password'});
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(200).json({success: false, reason: 'Username does not exist'});
      }

      if(password == user.password){
        res.cookie('email', user.email);
        res.cookie('token', crypto.encrypt(user.email));
        return res.status(200).json({success: true});
      }
      else{
        return res.status(200).json({success: false, reason: 'Password is not correct'});
      }
    });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { my_email: undefined});
};

exports.getLogout = (req, res, next) => {
  res.clearCookie('email');
  res.clearCookie('token');
  res.render("auth/login", { my_email: undefined});
};

exports.postReset = (req, res, next) => {
};
