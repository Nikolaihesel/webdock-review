const express = require('express');
const {getPosts} = require('../controllers/postControllers')
const router = express.Router();


// Get all posts
router.get('/', getPosts)

module.exports = router;
