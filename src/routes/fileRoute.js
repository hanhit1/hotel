const upload = require('../config/fileConfig');
const uploadFile = require('../controllers/fileController').uploadFile
const getFile = require('../controllers/fileController').getFile
const express = require('express');
const router = express.Router();
router.post('/upload', upload.single('myFile'), uploadFile)
router.get('/upload/:file_name',getFile)
module.exports = router;