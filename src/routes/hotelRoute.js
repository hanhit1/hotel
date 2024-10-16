const express = require('express');
const hotelController = require('../controllers/hotelController.js');
const checkRole = require('../middlewares/checkRole');
const router = express.Router();
router.get('/hotels',checkRole(['SuperAdmin','Admin']), hotelController.getAllHotel);
router.get('/hotels/:id',checkRole(['SuperAdmin','Admin']), hotelController.getHotelById);
router.put('/hotels/update/:id',checkRole(['SuperAdmin','Admin']), hotelController.updateHotel);
router.delete('/hotels/delete/:id',checkRole(['SuperAdmin','Admin']), hotelController.deleteHotel);
module.exports = router;