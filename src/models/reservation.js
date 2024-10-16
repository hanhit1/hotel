const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Reservation = sequelize.define('reservations', {
    reservation_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    checkin_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    checkout_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    room_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
Reservation.sync();
module.exports = Reservation;