const User = require("../model/users");
const crypto = require("../controllers/crypto");
const authmiddleware = (req,res,next) =>{
  if(req.url == '/login' || req.url == '/' || req.url == '/send_password' || req.url == '/create_game' || req.url == '/start_game')
  {
    next();
    return;
  }
  if(!req.cookies.email || !req.cookies.token)
    return res.redirect("/login");
  if(req.cookies.email != crypto.decrypt(req.cookies.token))
    return res.redirect("/login");
  next();
}

module.exports = authmiddleware
