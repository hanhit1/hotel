const express = require('express');
const hotelController = require('../controllers/hotelController.js');
const router = express.Router();
router.get('/hotels', hotelController.getAllHotel);
module.exports = router;