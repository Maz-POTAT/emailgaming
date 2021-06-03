const express = require("express");
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("./crypto");
const Sequelize = require("sequelize");
const transporter = require("./mailserver");
const Op = Sequelize.Op;
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
        return res.status(422).json( {errorMessage: "invalid email or password!"});
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
    return res.status(422).render("auth/login", {
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationError: errors.array()
    });
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          errorMessage: "invalid email or password!",
          oldInput: {
            email: email,
            password: password
          },
          validationError: errors.array()
        });
      }

      if(password == user.password){
        res.cookie('email', user.email);
        res.cookie('token', crypto.encrypt(user.email));
        return res.redirect("/");
      }
      else{
        return res.status(422).render("auth/login", {
          errorMessage: "invalid email or password!",
          oldInput: {
            email: email,
            password: password
          },
          validationError: errors.array()
        });
      }
    });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    errorMessage: null,
    oldInput: {
      email: "",
      password: ""
    },
    validationError: []
  });
};

exports.postReset = (req, res, next) => {
};
