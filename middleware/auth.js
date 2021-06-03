const User = require("../model/users");
const bcrypt = require("bcryptjs");

const authmiddleware = (req,res,next) =>{
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  next();
}

module.exports = authmiddleware
