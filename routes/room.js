const express = require("express");
const router = express.Router();

router.get("/create_game", (req, res, next) => {
  res.render("home");
});

module.exports = router
