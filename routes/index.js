const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", { title: 'Game Setting', my_email: req.cookies.email});
});

module.exports = router
