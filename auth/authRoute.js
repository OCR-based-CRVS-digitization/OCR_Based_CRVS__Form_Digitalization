const express = require("express");
const router = express.Router();


// Login route
const { authLogin } = require('./authController');
router.post('/login', authLogin);

// admin login
const { authLoginAdmin } = require('./authController');
router.post('/loginAdmin', authLoginAdmin);



module.exports = router;