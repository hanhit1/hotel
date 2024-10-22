const { DESCRIBE } = require('sequelize/lib/query-types');
const reservationController = require('../controllers/reservationController');
const reservationService = require('../services/reservationService');
const httpMocks = require('node-mocks-http');
jest.mock('../services/reservationService');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('createReservation', () => {
    test('should create a reservation successfully', async () => {
        const mockReservation = {
            reservation_id: 1,
            checkin_date: new Date('2024-01-01'),
            checkout_date: new Date('2024-01-10'),
            user_id: 1,
            room_id: 1,
            status: 'confirmed',
        };

        reservationService.createReservation.mockResolvedValue(mockReservation);

        req.body = {
            checkin_date: new Date('2024-01-01'),
            checkout_date: new Date('2024-01-10'),
            user_id: 1,
            room_id: 1,
            status: 'confirmed',
        };

        await reservationController.createReservation(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(mockReservation);
        expect(reservationService.createReservation).toHaveBeenCalledWith(req.body);
    });

    test('should handle error when failing to create reservation', async () => {
        reservationService.createReservation.mockRejectedValue(
            new Error('Failed to create reservation'),
        );
        req.body = {
            checkin_date: new Date('2024-01-01'),
            checkout_date: new Date('2024-01-10'),
            user_id: 1,
            room_id: 1,
            status: 'confirmed',
        };

        await reservationController.createReservation(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({
            message: 'Error creating reservation',
        });
        expect(reservationService.createReservation).toHaveBeenCalledWith(req.body); // Kiểm tra xem phương thức được gọi đúng với dữ liệu
    });
});
