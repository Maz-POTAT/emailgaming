const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", { my_email: req.cookies.email});
});

module.exports = router
