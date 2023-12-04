const express = require('express');
const {
	getPosts,
	getUsersPosts,
	getPost,
	createPost,
	deletePost,
	updatePost,
} = require('../controllers/postControllers');
const router = express.Router();

//Get users posts
router.get('/posts/user/userId', getUsersPosts);

// Get single post
router.get('/:id', getPost);

// Get all posts
router.get('/', getPosts);

// Create a new post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', deletePost);

// UPDATE post
router.patch('/:id', updatePost);

module.exports = router;
