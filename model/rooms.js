const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./users");
const Game = require("./games");

const Room = sequelize.define("room", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  game_id: {
    type: Sequelize.INTEGER,
    // references:{
    //   model: Game,
    //   key: 'game_id',
    // }
  },
  game_title: {
    type: Sequelize.STRING,
    // references:{
    //   model: Game,
    //   key: 'game_id',
    // }
  },
  player1_id: {
    type: Sequelize.INTEGER,
    // references:{
    //   model: User,
    //   key: 'player1_id',
    // }
  },
  player2_id: {
    type: Sequelize.INTEGER,
    // references:{
    //   model: User,
    //   key: 'player2_id',
    // }
  },
  status: Sequelize.INTEGER,
  data: Sequelize.STRING,
});

// Game.hasOne(Room, {
//   foreignKey: {
//     name: 'game_id',
//     allowNull: true
//   }
// });
// Room.belongsTo(Game);
// User.hasOne(Room, {
//   foreignKey: {
//     name: 'player1_id',
//     allowNull: true
//   }
// })
// Room.belongsTo(User);
// User.hasOne(Room, {
//   foreignKey: {
//     name: 'player2_id',
//     allowNull: true
//   }
// })
// Room.belongsTo(User);

Room.belongsTo(sequelize.models.user, {foreignKey: {name: 'player1_id', allowNull: true}, as: 'Player1', constraints: false});
Room.belongsTo(sequelize.models.user, {foreignKey: {name: 'player2_id', allowNull: true}, as: 'Player2', constraints: false});
Room.belongsTo(sequelize.models.game, {foreignKey: {name: 'game_id', allowNull: true}, as: 'Game'});

module.exports = Room;
