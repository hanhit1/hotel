const hotelService = require('../services/hotelService.js');
exports.getAllHotel = async (req, res) => {
    try {
        const hotels = await hotelService.getAllHotel();
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error getting hotels:', error);
        res.status(500).json({ message: 'Error getting hotels' });
    }
};