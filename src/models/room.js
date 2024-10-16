const e = require('express');
const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Room = sequelize.define("rooms", {
  room_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  area: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  floor: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hotel_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Room.sync();
module.exports = Room;