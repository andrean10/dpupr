const controller = require('../controller/auth');
const express = require('express');
const router = express.Router();

router.post('/login', controller.login);
module.exports = router;