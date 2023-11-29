const express = require('express');
const {
	getPosts,
	getPost,
	createPost,
	deletePost,
	updatePost,
} = require('../controllers/postControllers');
const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPost);

// Create a new post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', deletePost);

// UPDATE post
router.patch('/:id', updatePost);

module.exports = router;
