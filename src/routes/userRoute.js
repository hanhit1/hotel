const express = require('express');
const checkRole = require('../middlewares/checkRole');
const userController = require('../controllers/userController.js');
const router = express.Router();
router.get('/admins',checkRole(['SuperAdmin']) ,userController.getAdmin);
router.put('/admins/update/:id',checkRole(['SuperAdmin']) ,userController.updateAdmin);
router.get('/admins/delete/:id',checkRole(['SuperAdmin']) ,userController.deleteAdmin);
module.exports = router;