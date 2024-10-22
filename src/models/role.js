const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Role = sequelize.define('roles', {
    role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
Role.sync();
module.exports = Role;
