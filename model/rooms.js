const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Room = sequelize.define("room", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  game_id: Sequelize.INTEGER,
  player1_id: Sequelize.INTEGER,
  player2_id: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  data: Sequelize.STRING,
});

module.exports = Room;
