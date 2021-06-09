const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.post("/create_game", roomController.postCreateRoom);
router.post("/submit_turn", roomController.postSubmitTurn);

router.get("/game", roomController.getGame);
router.get("/my_games", roomController.getMyGame);

module.exports = router
