const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.get("/", roomController.getHome);

module.exports = router
