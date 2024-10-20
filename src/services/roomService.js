const Room = require('../models/room');
exports.createRoom = async (room) => {
    try {
        return await Room.create(room);
    } catch (error) {
        console.error('Error creating room:', error);
        throw error
    }
}
exports.approveRoom = async (roomId) => { 
    try {
        return await Room.update({ room_id: roomId }, { status: 'approved' });
    }
    catch (error) {
        console.error('Error approving room:', error);
        throw error
    }
}