const express = require("express");
const router = express.Router();

const { adminAuthenticate } = require('../authentication');

//create user
const { createUser } = require('./adminController');
router.post('/createUser', adminAuthenticate, createUser);



module.exports = router;