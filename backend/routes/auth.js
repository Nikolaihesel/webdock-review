require('dotenv').config();
const express = require('express');
const router = express.Router();

const { ssoVerify } = require('../middelware/requireAuth');

router.post('/', ssoVerify);

module.exports = router;
