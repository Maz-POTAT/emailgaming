const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", { title: 'Home',    active_page: 'home',  my_email: req.cookies.email});
});

module.exports = router
