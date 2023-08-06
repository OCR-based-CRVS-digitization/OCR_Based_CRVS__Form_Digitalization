//this is the base api
//all other apis are routed from here

const express = require('express');
const router = express.Router();

const auth = require('./auth/authRoute');
const admin = require('./admin/adminRoute');

router.get('/', (req, res) => {
    res.send('Hello world!\n');
});

router.use('/auth', auth);
router.use('/admin', admin);

module.exports = router;