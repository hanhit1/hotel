const upload = require('../config/fileConfig')
const path = require('path');
const fs = require('fs')
exports.uploadFile = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({message:'Please upload a file'})
        } else
        {
            res.status(200).send(file)
            }
    }
    catch {
        res.status(500).json({message: 'Error upload file'})
    }
}
exports.getFile = (req, res) => {
    try {
        const fileName = req.params.file_name;
        const filePath = path.join(__dirname, '../public/', fileName);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(err)
                return res.status(404).send('File not found.');
            }
            res.sendFile(filePath);
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Error get file');
    }
}