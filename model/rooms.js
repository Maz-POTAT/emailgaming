const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./rooms");
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

Room.belongsTo(sequelize.models.user, {foreignKey: 'player1_id', as: 'Player1'});
Room.belongsTo(sequelize.models.user, {foreignKey: 'player2_id', as: 'Player2'});
Room.belongsTo(sequelize.models.game, {foreignKey: 'game_id', as: 'Game'});

module.exports = Room;
