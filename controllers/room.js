const User = require("../model/users");
const Room = require("../model/rooms");
const crypto = require("./crypto");
const transporter = require("./mailserver");
var generator = require('generate-password');

exports.getCreateRoom = async (req, res, next) => {
  let game_id = req.body.game_id;
  let game_title = req.body.game_title;
  let my_position = req.body.my_position;
  let player1 = '';
  let player2 = '';
  if(my_position == 0){
    player1 = req.body.my_email;
    player2 = req.body.oppo_email;
  }
  else if(my_position == 1)
  {
    player1 = req.body.oppo_email;
    player2 = req.body.my_email;
  }
  console.log(game_id, game_title, player1, player2, req.body.my_position);

  let user1 = await User.findOne({ where: { email: player1 } });
  if (!user1) {
    let newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    user1 = new User({
      email: player1,
      password: newPassword
    });
    
    if(!await user1.save())
      return res.status(200).json( {success: false, errorMessage: "failed to create game"});
  }
  let user2 = await User.findOne({ where: { email: player2 } });
  if (!user2) {
    let newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    user2 = new User({
      email: player2,
      password: newPassword
    });
    if(!await user2.save())
      return res.status(200).json( {success: false, errorMessage: "failed to create game"});
  }

  let room = new Room({
    game_id: game_id,
    game_title: game_title,
    player1_id: user1.id,
    player2_id: user2.id,
    status: -1,
    data:''
  });
  if(!await room.save())
    return res.status(200).json( {success: false, errorMessage: "failed to create game"});

  transporter.sendMail({
    to: req.body.oppo_email,
    from: "jackie.devil001@gmail.com",
    subject: "Emailgaming",
    html: "<h1>"+ req.body.my_email + " request a game </h1>"
  });
  return res.status(200).json({success:true, room_id:room.id, my_email: req.cookies.email});
};

exports.getGame = async (req, res, next) => {
  console.log(req.query);
  let room_id = req.query.room_id;
  let my_email = req.query.my_email;
  let room = await Room.findOne({ where: { id: room_id } });
  if (!room) {
    res.redirect('/');
  }

  let user1 = await User.findOne({ where: { id: room.player1_id } });
  if (!user1) {
    res.redirect('/');
  }

  let user2 = await User.findOne({ where: { id: room.player2_id } });
  if (!user2) {
    res.redirect('/');
  }

  res.render("game", {
    my_email: my_email,
    player1_email: user1.email,
    player2_email: user2.email,
    game_title: room.game_title,
    status: room.status,
    my_email: req.cookies.email
  });
};
