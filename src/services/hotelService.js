const e = require('express');
const Hotel = require('../models/hotel');
exports.getAllHotel = async () => {
return await Hotel.findAll();
};