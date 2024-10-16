const express = require('express');
const mailController = require('../controllers/mailController');
const router = express.Router();
router.post('/send', mailController.sendMail);
module.exports = router;