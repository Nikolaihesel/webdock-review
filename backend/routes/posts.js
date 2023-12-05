const express = require('express');

const {
	getPosts,
	getPost,
	createPost,
	deletePost,
	updatePost,
	createPostComment,
	getUsersPost,
	addLikeToPost,
} = require('../controllers/postControllers');
const router = express.Router();

router.get('/user/:userId', getUsersPost);

router.patch('/:id/likes', addLikeToPost);

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

//CREATE comment
router.post('/:id/comment', createPostComment);

module.exports = router;
