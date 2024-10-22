const fileController = require('../controllers/fileController');
const httpMocks = require('node-mocks-http');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('File Controller - uploadFile', () => {
    test('should return 400 if no file is uploaded', async () => {
        req.file = undefined;
        await fileController.uploadFile(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: 'Please upload a file' });
    });

    test('should return 200 and file info if file is uploaded', async () => {
        const mockFile = {
            filename: 'testfile.txt',
            mimetype: 'text/plain',
            size: 1234,
        };
        req.file = mockFile;

        await fileController.uploadFile(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getData()).toEqual(mockFile);
    });

    test('should return 500 if an error occurs during upload', async () => {
        jest.spyOn(res, 'send').mockImplementation(() => {
            throw new Error();
        });

        await fileController.uploadFile(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error upload file' });
    });
});

describe('File Controller - getFile', () => {
    test('should return 404 if file is not found', async () => {
        req.params.file_name = 'nonexistentfile.txt';
        const filePath = path.join(__dirname, '../public/', req.params.file_name);

        fs.access.mockImplementation((path, flags, callback) => {
            callback(new Error('File not found'));
        });

        await fileController.getFile(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getData()).toEqual('File not found.');
    });

    test('should return the file if it exists', async () => {
        req.params.file_name = 'testfile.txt';
        const filePath = path.join(__dirname, '../public/', req.params.file_name);

        fs.access.mockImplementation((path, flags, callback) => {
            callback(null);
        });

        res.sendFile = jest.fn();
        await fileController.getFile(req, res);

        expect(fs.access).toHaveBeenCalledWith(filePath, fs.constants.F_OK, expect.any(Function));
        expect(res.sendFile).toHaveBeenCalledWith(filePath);
    });

    test('should return 500 if an error occurs during getFile', async () => {
        req.params.file_name = 'errorfile.txt';
        const filePath = path.join(__dirname, '../public/', req.params.file_name);

        fs.access.mockImplementation((path, flags, callback) => {
            throw new Error('Error get file');
        });

        await fileController.getFile(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getData()).toEqual('Error get file');
    });
});
