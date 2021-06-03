const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Room_Log = sequelize.define("room_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  room_id: Sequelize.INTEGER,
  player_id: Sequelize.INTEGER,
  action: Sequelize.STRING,
});

module.exports = Room_Log;
