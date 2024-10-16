const express = require('express');
const roomController = require('../controllers/roomController.js');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');
router.post('/rooms', roomController.createRoom);
router.put('rooms/approve/:id',checkRole(['SuperAdmin','Admin']), roomController.approveRoom);
module.exports = router;
