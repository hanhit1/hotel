// hotelController.test.js
const hotelController = require('../controllers/hotelController');
const hotelService = require('../services/hotelService');
const redisMock = require('redis-mock');
const httpMocks = require('node-mocks-http');

// Mock Redis client
jest.mock('redis', () => redisMock);
// Mock hotelService methods
jest.mock('../services/hotelService');

let req, res, next;
const mockRedisClient = redisMock.createClient();

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    mockRedisClient.flushall();  // Clear Redis cache before each test
});

describe('getAllHotel', () => {
    test('should return all hotels successfully', async () => {
        // Mock hotelService.getAllHotel to return hotel data
        const mockHotels = [{ id: 1, name: 'Hotel A' }, { id: 2, name: 'Hotel B' }];
        hotelService.getAllHotel.mockResolvedValue(mockHotels);

        await hotelController.getAllHotel(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockHotels);
        expect(hotelService.getAllHotel).toHaveBeenCalled();
    });

    test('should handle error when failing to fetch hotels', async () => {
        hotelService.getAllHotel.mockRejectedValue(new Error('Failed to fetch hotels'));

        await hotelController.getAllHotel(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error getting hotels' });
        expect(hotelService.getAllHotel).toHaveBeenCalled();
    });
});

describe('getHotelById', () => {
    test('should return cached hotel data', async () => {
        const mockHotel = { id: 1, name: 'Hotel A' };
        mockRedisClient.get = jest.fn().mockResolvedValue(JSON.stringify(mockHotel));
        req.params.id = '1';

        await hotelController.getHotelById(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockHotel);
        expect(mockRedisClient.get).toHaveBeenCalledWith('hotel:1');
    });

    test('should return hotel data from service when not cached', async () => {
        const mockHotel = { id: 1, name: 'Hotel A' };
        mockRedisClient.get = jest.fn().mockResolvedValue(null);
        hotelService.getHotelById.mockResolvedValue(mockHotel);
        req.params.id = '1';

        await hotelController.getHotelById(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockHotel);
        expect(hotelService.getHotelById).toHaveBeenCalledWith('1');
        expect(mockRedisClient.setex).toHaveBeenCalledWith('hotel:1', 3600, JSON.stringify(mockHotel));
    });

    test('should return 404 if hotel not found', async () => {
        mockRedisClient.get = jest.fn().mockResolvedValue(null);
        hotelService.getHotelById.mockResolvedValue(null);
        req.params.id = '99';

        await hotelController.getHotelById(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Hotel not found' });
    });

    test('should handle error when failing to get hotel', async () => {
        mockRedisClient.get = jest.fn().mockResolvedValue(null);
        hotelService.getHotelById.mockRejectedValue(new Error('Failed to get hotel'));
        req.params.id = '1';

        await hotelController.getHotelById(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error getting hotel' });
    });
});

describe('updateHotel', () => {
    test('should update hotel and refresh cache', async () => {
        const updatedHotel = { id: 1, name: 'Updated Hotel' };
        hotelService.updateHotel.mockResolvedValue(updatedHotel);
        req.params.id = '1';
        req.body = updatedHotel;

        await hotelController.updateHotel(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(updatedHotel);
        expect(mockRedisClient.del).toHaveBeenCalledWith('hotel:1');
        expect(mockRedisClient.setex).toHaveBeenCalledWith('hotel:1', 3600, JSON.stringify(updatedHotel));
    });

    test('should return 404 if hotel not found for update', async () => {
        hotelService.updateHotel.mockResolvedValue(null);
        req.params.id = '99';
        req.body = { name: 'New Name' };

        await hotelController.updateHotel(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Hotel not found' });
    });

    test('should handle error when failing to update hotel', async () => {
        hotelService.updateHotel.mockRejectedValue(new Error('Failed to update hotel'));
        req.params.id = '1';
        req.body = { name: 'New Name' };

        await hotelController.updateHotel(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error updating hotel' });
    });
});

describe('deleteHotel', () => {
    test('should delete hotel successfully', async () => {
        const mockHotel = { id: 1, name: 'Hotel A' };
        hotelService.deleteHotel.mockResolvedValue(mockHotel);
        req.params.id = '1';

        await hotelController.deleteHotel(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockHotel);
    });

    test('should return 404 if hotel not found for deletion', async () => {
        hotelService.deleteHotel.mockResolvedValue(null);
        req.params.id = '99';

        await hotelController.deleteHotel(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Hotel not found' });
    });

    test('should handle error when failing to delete hotel', async () => {
        hotelService.deleteHotel.mockRejectedValue(new Error('Failed to delete hotel'));
        req.params.id = '1';

        await hotelController.deleteHotel(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error deleting hotel' });
    });
});
