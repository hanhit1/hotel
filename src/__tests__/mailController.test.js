const { DESCRIBE } = require('sequelize/lib/query-types');
const mailController = require('../controllers/mailController');
const mailService = require('../services/mailService');
const httpMocks = require('node-mocks-http');
jest.mock('../services/mailService');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe('sendMail', () => {
    test('should send email successfully for new user', async () => {
        const mockMail = { to: 'lezancuong@gmail.com', subject: 'Hello', name: 'Cuong' };
    
        mailService.getUserByEmail.mockResolvedValue(null); 
        mailService.createUser.mockResolvedValue({ id: 1, email: mockMail.to });
        mailService.sendMail.mockResolvedValue(true);

        req.body = mockMail;

        await mailController.sendMail(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Email sent' });
        expect(mailService.getUserByEmail).toHaveBeenCalledWith(mockMail.to);
        expect(mailService.createUser).toHaveBeenCalledWith({ email: mockMail.to, name: mockMail.name });
        expect(mailService.sendMail).toHaveBeenCalledWith(mockMail.to, mockMail.subject, mockMail.name);
    });

    test('should not send email if user already exists', async () => {
        const mockUser = { id: 1, email: 'ngoconghanh2k4@gmail.com', name: 'Hanh' };
        const mockMail = { to: 'lezancuong@gmail.com', subject: 'Hello', name: 'Cuong' };
        mailService.getUserByEmail.mockResolvedValue(mockUser);

        req.body = mockMail;

        await mailController.sendMail(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: 'User already exists' });
        expect(mailService.getUserByEmail).toHaveBeenCalledWith(mockMail.to);
        expect(mailService.createUser).not.toHaveBeenCalled(); 
        expect(mailService.sendMail).not.toHaveBeenCalled(); 
    });

    test('should handle errors properly', async () => {
        const mockMail = { to: 'lezancuong@gmail.com', subject: 'Hello', name: 'Cuong' };
        
        mailService.getUserByEmail.mockRejectedValue(new Error('DB error'));

        req.body = mockMail;

        await mailController.sendMail(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error sending email' });
    });
});