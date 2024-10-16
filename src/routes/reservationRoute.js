const express = require('express');
const reservationController = require('../controllers/reservationController.js');

const router = express.Router();
router.post('/reservation', reservationController.createReservation);
module.exports = router;