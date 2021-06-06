const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.post("/create_game", roomController.getCreateRoom);

router.get("/game", roomController.getGame);

module.exports = router
