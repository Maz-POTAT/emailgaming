const User = require("../model/users");
const Room = require("../model/rooms");
const Game = require("../model/games");
const Room_Log = require("../model/room_logs");
const { Op } = require("sequelize");
const crypto = require("./crypto");
const transporter = require("./mailserver");
var generator = require('generate-password');

exports.postCreateRandomRoom = async (req, res, next) => {
  let game_id = req.body.game_id;
  let game_title = req.body.game_title;
  let my_position = req.body.my_position;
  let my_email = req.body.my_email;

  let user = await User.findOne({ where: { email: my_email } });
  if (!user) {
    let newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    user = new User({
      email: my_email,
      password: newPassword
    });
    
    if(!await user.save())
      return res.status(200).json( {success: false, errorMessage: "failed to create game"});
  }

  let room = new Room({
    game_id: game_id,
    game_title: game_title,
    player1_id: my_position == 0? user.id : null,
    player2_id: my_position == 1? user.id : null,
    status: -1,
    data:'{}'
  });
  if(!await room.save())
    return res.status(200).json( {success: false, errorMessage: "failed to create game"});
  return res.status(200).json({success:true, my_email: req.cookies.email});
};

exports.postJoinRoom = async (req, res, next) => {
  let room_id = req.body.room_id;
  let my_position = req.body.my_position;
  let my_email = req.cookies.email;

  let user = await User.findOne({ where: { email: my_email } });
  if (!user) {
    let newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    user = new User({
      email: my_email,
      password: newPassword
    });
    
    if(!await user.save())
      return res.status(200).json( {success: false, errorMessage: "failed to join game"});
  }

  let room = await Room.findOne({ where: { id: room_id } });
  if(!room){
    return res.status(200).json( {success: false, errorMessage: "failed to join game"});
  }

  if(my_position == "0"){
    room.player1_id = user.id;
  }
  else{
    room.player2_id = user.id;
  }
  room.status = 0;
  
  if(!await room.save())
    return res.status(200).json( {success: false, errorMessage: "failed to join game"});
  return res.status(200).json({success:true, my_email: req.cookies.email});
};

exports.postCreateRoom = async (req, res, next) => {
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
    status: 0,
    data:'{}'
  });
  if(!await room.save())
    return res.status(200).json( {success: false, errorMessage: "failed to create game"});

  transporter.sendMail({
    to: req.body.oppo_email,
    from: "tuktarov2121@gmail.com",
    subject: "Emailgaming",
    html: "<h1>"+ req.body.my_email + " request a game </h1>"
  });
  return res.status(200).json({success:true, room_id:room.id, my_email: req.cookies.email});
};

exports.postSubmitTurn = async (req, res, next) => {
  let room_id = req.body.room_id;
  let player_id = req.body.player_id;
  let action = req.body.action;
  let data = req.body.data;
  let status = req.body.status;

  let room = await Room.findOne({ where: { id: room_id } });
  if (!room) {
      return res.status(200).json( {success: false, errorMessage: "failed to save turn"});
  } else{
    room.status = status;
    room.data = data;
    if(!await room.save())
      return res.status(200).json( {success: false, errorMessage: "failed to save turn"});
  }

  log = new Room_Log({
    room_id: room_id,
    player_id: player_id,
    action: action
  });
  // if(!await log.save())
  //   return res.status(200).json( {success: false, errorMessage: "failed to save turn"});
  await log.save();

  let oppo_id = room.player1_id == player_id ? room.player2_id : room.player1_id;
  let user = await User.findOne({ where: { id: oppo_id } });
  let oppo_email = "";
  if(user){
    oppo_email = user.email;
  }

  transporter.sendMail({
    to: oppo_email,
    from: "tuktarov2121@gmail.com",
    subject: "Emailgaming",
    html: "<h1>It's your trun on "+ room.game_title + " game</h1>"
  });
  return res.status(200).json({success:true});
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

  let game = await Game.findOne({ where: { id: room.game_id } });
  if (!game) {
    res.redirect('/');
  }

  let bMyTurn = (room.status == 0 && my_email == user1.email) || (room.status == 1 && my_email == user2.email)
  let bResign = room.status < 2;
  res.render("game", {
    title: game.name, 
    my_email: my_email,
    player1_email: user1.email,
    player2_email: user2.email,
    room: room,
    bMyTurn: bMyTurn,
    bResign: bResign,
    active_page: '', 
  });
};

exports.getMyGame = async (req, res, next) => {
  let my_email = req.cookies.email;
  let user = await User.findOne({ where: { email: my_email } });
  let my_id = 0;
  if(user){
    my_id = user.id;
  }

  let room = await Room.findAll({ 
    where: { [Op.and] : [ {[Op.or] : [{ player1_id: my_id }, { player2_id: my_id }]} , {status : { [Op.gt] : -1}}] },
    include: [{ model: User, as: 'Player1'}, { model: User, as: 'Player2'}, { model: Game, as: 'Game'}] }
  );

  if (!room) {
    res.redirect('/');
  }

  res.render("my_games", {
    title: 'My Games',
    active_page: 'mine',
    my_email: my_email,
    my_rooms: room.map(function(room_info){return room_info.dataValues}),
  });
};

exports.getHome = async (req, res, next) => {
  let game = await Game.findAll({raw : true});
  res.render("home", { title: 'Home',    active_page: 'home',  my_email: req.cookies.email, games: game});
};

exports.getJoinGame = async (req, res, next) => {
  let my_email = req.cookies.email;

  let user = await User.findOne({ where: { email: my_email } });
  let my_id = 0;
  if(user){
    my_id = user.id;
  }

  let room = await Room.findAll({ 
    where: { status: -1, [Op.or]: [{player1_id: { [Op.ne] : my_id }}, {player1_id: { [Op.is] : null }}], [Op.or]: [{player2_id: { [Op.ne] : my_id }}, {player2_id: { [Op.is] : null }}]},
    include: [{ model: User, as: 'Player1'}, { model: User, as: 'Player2'}, { model: Game, as: 'Game'}] }
  );

  if (!room) {
    res.redirect('/');
  }

  res.render("join_game", {
    title: 'Join Game',
    active_page: 'join',
    my_email: my_email,
    my_rooms: room.map(function(room_info){return room_info.dataValues}),
  });
};

exports.getProfile = async (req, res, next) => {
  let my_email = req.cookies.email;

  let user = await User.findOne({ where: { email: my_email } });
  let my_id = 0;
  if(user){
    my_id = user.id;
  }


  res.render("profile", {
    title: 'User Profile',
    active_page: 'profile',
    my_email: my_email,
  });
};
