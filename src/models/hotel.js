const e = require('express');
const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Hotel = sequelize.define('hotels', {
    hotel_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
});
Hotel.sync();
module.exports = Hotel;