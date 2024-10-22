const hotelService = require('../services/hotelService.js');
const client = require('redis');
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
        const hotel_id = req.params.id;
        const cacheData = client.get(`hotel:${hotel_id}`);
        if (cacheData) {
            return res.json(JSON.parse(cacheData));
        } else {
            const hotel = await hotelService.getHotelById();
            if (hotel) {
                client.setex(`hotel:${hotel_id}`, 3600, JSON.stringify(hotelData));
                res.status(200).json(hotel);
            } else {
                res.status(404).json({ message: 'Hotel not found' });
            }
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
            client.del(`hotel:${req.params.id}`);
            client.setex(`hotel:${req.params.id}`, 3600, JSON.stringify(hotelData));
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
