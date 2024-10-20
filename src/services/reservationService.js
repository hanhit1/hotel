const Reservation = require('../models/reservation');
const Room = require('../models/room');
const User = require('../models/user');
exports.createReservation = async (reservation) => {
    try {
        const room = await Room.findByPk(reservation.room_id );
        if (!room) {
            return { message: 'Room not found' };
        }
        const user = await User.findByPk(reservation.user_id );
        if (!user) {
            return { message: 'User not found' };
        }
        const newReservation = await Reservation.create(reservation);
        room.status = 'Đã đặt';
        await room.save();
        return newReservation;
    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error
    }
}