const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.post("/create_game", roomController.postCreateRoom);
router.post("/create_room", roomController.postCreateRandomRoom);
router.post("/submit_turn", roomController.postSubmitTurn);
router.post("/join_room", roomController.postJoinRoom);
router.post("/reset_profile", roomController.postProfile);


router.get("/start_game", (req, res, next) => {
   res.render("start_game", { title: 'Start Game',    active_page: 'start',  my_email: req.cookies.email})
});

router.get("/game", roomController.getGame);
router.get("/my_games", roomController.getMyGame);
router.get("/join_game", roomController.getJoinGame);
router.get("/profile", roomController.getProfile);

module.exports = router
