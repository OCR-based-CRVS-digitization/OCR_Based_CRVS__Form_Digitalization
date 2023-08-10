const express = require("express");
const router = express.Router();


const { createWorkspace } = require('../Controller/workspaceController');
router.post('/createWorkspace', createWorkspace);

module.exports = router;