const userController = require('../controllers/userController');
const userService = require('../services/userService');
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
        const mockUsers = [
            {
                user_id: 1,
                name: 'Admin A',
                phone: '123456789',
                address: 'Address A',
                email: 'adminA@example.com',
                password: 'password123',
                role_id: 1,
            },
            {
                user_id: 2,
                name: 'Admin B',
                phone: '987654321',
                address: 'Address B',
                email: 'adminB@example.com',
                password: 'password456',
                role_id: 1,
            },
        ];
        userService.getAdmin.mockResolvedValue(mockUsers);

        await userController.getAdmin(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockUsers);
        expect(userService.getAdmin).toHaveBeenCalled();
    });

    test('should handle error when failing to fetch admins', async () => {
        userService.getAdmin.mockRejectedValue(new Error('Failed to fetch admins'));

        await userController.getAdmin(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error getting admin' });
        expect(userService.getAdmin).toHaveBeenCalled();
    });
});

describe('updateAdmin', () => {
    test('should update admin successfully', async () => {
        const mockAdmin = {
            user_id: 1,
            name: 'Admin A',
            phone: '123456789',
            address: 'Address A',
            email: 'adminA@example.com',
            password: 'password123',
            role_id: 1,
        };
        userService.updateAdmin.mockResolvedValue(mockAdmin);
        req.params.id = '1';
        req.body = { name: 'Admin A' };

        await userController.updateAdmin(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockAdmin);
        expect(userService.updateAdmin).toHaveBeenCalledWith('1', {
            name: 'Admin A',
        });
    });

    test('should handle error when failing to update admin', async () => {
        userService.updateAdmin.mockRejectedValue(new Error('Failed to update admin'));
        req.params.id = '1';
        req.body = { name: 'Admin A' };

        await userController.updateAdmin(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error updating admin' });
        expect(userService.updateAdmin).toHaveBeenCalledWith('1', {
            name: 'Admin A',
        });
    });
});

describe('deleteAdmin', () => {
    test('should delete admin successfully', async () => {
        const mockAdmin = {
            user_id: 1,
            name: 'Admin A',
            phone: '123456789',
            address: 'Address A',
            email: 'adminA@example.com',
            password: 'password123',
            role_id: 1,
        };
        userService.deleteAdmin.mockResolvedValue(mockAdmin);
        req.params.id = '1';

        await userController.deleteAdmin(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockAdmin);
        expect(userService.deleteAdmin).toHaveBeenCalledWith('1');
    });

    test('should handle error when failing to delete admin', async () => {
        userService.deleteAdmin.mockRejectedValue(new Error('Failed to delete admin'));
        req.params.id = '1';

        await userController.deleteAdmin(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error deleting admin' });
        expect(userService.deleteAdmin).toHaveBeenCalledWith('1');
    });
});
