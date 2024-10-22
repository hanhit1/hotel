const roomService = require('../services/roomService');
exports.createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Error creating room' });
    }
};
exports.approveRoom = async (req, res) => {
    try {
        const room = await roomService.approveRoom(req.params.roomId);
        res.status(200).json(room);
    } catch (error) {
        console.error('Error approving room:', error);
        res.status(500).json({ message: 'Error approving room' });
    }
};
