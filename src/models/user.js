const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const User = sequelize.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});
User.sync();

module.exports = User;
