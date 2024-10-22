const { DESCRIBE } = require('sequelize/lib/query-types');
const roomController = require('../controllers/roomController');
const roomService = require('../services/roomService');
const httpMocks = require('node-mocks-http');
jest.mock('../services/roomService');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('createRoom', () => {
    test('should create a room successfully', async () => {
        const mockRoom = {
            room_id: 1,
            name: 'Room A',
            type: 'Deluxe',
            area: 50.5,
            floor: 3,
            status: 'available',
            price: 100,
            hotel_id: 1,
        };

        roomService.createRoom.mockResolvedValue(mockRoom);
        req.body = {
            name: 'Room A',
            type: 'Deluxe',
            area: 50.5,
            floor: 3,
            status: 'available',
            price: 100,
            hotel_id: 1,
        };
        await roomController.createRoom(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(mockRoom);
        expect(roomService.createRoom).toHaveBeenCalledWith(req.body);
    });

    test('should handle error when failing to create room', async () => {
        roomService.createRoom.mockRejectedValue(new Error('Failed to create room'));
        req.body = {
            name: 'Room A',
            type: 'Deluxe',
            area: 50.5,
            floor: 3,
            status: 'available',
            price: 100,
            hotel_id: 1,
        };

        await roomController.createRoom(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error creating room' });
        expect(roomService.createRoom).toHaveBeenCalledWith(req.body);
    });
});

describe('approveRoom', () => {
    test('should approve a room successfully', async () => {
        const mockRoom = {
            room_id: 1,
            name: 'Room A',
            type: 'Deluxe',
            area: 50.5,
            floor: 3,
            status: 'available',
            price: 100,
            hotel_id: 1,
        };

        roomService.approveRoom.mockResolvedValue(mockRoom);
        req.params.id = '1';

        await roomController.approveRoom(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockRoom);
        expect(roomService.approveRoom).toHaveBeenCalledWith('1');
    });

    test('should handle error when failing to approve room', async () => {
        roomService.approveRoom.mockRejectedValue(new Error('Failed to approve room'));

        await roomController.approveRoom(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error approving room' });
        expect(roomService.approveRoom).toHaveBeenCalledWith('1');
    });
});
