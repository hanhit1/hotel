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
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await hotelService.getHotelById(req.params.id);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        console.error('Error getting hotel:', error);
        res.status(500).json({ message: 'Error getting hotel' });
    }
};
exports.updateHotel = async (req, res) => {
    try {
        const hotel = await hotelService.updateHotel(req.params.id, req.body);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({ message: 'Error updating hotel' });
    }
};
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await hotelService.deleteHotel(req.params.id);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ message: 'Error deleting hotel' });
    }
};