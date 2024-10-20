const { DESCRIBE } = require('sequelize/lib/query-types');
const userController = require('../controllers/hotelController');
const userService = require('../services/hotelService');
const httpMocks = require('node-mocks-http');
jest.mock('../services/userService');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe('getAdmin', () => {
    test('should return all admins successfully', async () => { 
        const mockUsers = [{ id: 1, name: 'Admin A' }, { id: 2, name: 'Admin B' }];
        userService.getAdmin.mockResolvedValue(mockUsers);
        await userController.getAdmin(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toEqual(mockUsers)
        expect(userService.getAdmin).toHaveBeenCaller()
    })
    test('should handle error when failing to fetch admins', async () => {
        userService.getAdmin.mockRejectedValue(new Error('Failed to fetch admins'));
        await userController.getAdmin(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error getting admin' });
        expect(userService.getAdmin).toHaveBeenCalled();
    });
})