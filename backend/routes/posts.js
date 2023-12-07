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
	getSearchRequest,
	getPostStatus,
} = require('../controllers/postControllers');
const router = express.Router();

//get all specific user posts
router.get('/user/:userId', getUsersPost);

//add like to post
router.patch('/:id/likes', addLikeToPost);

//search for specific post
router.get('/search', getSearchRequest);

//sort by featurestatus
router.get('/featureStatus', getPostStatus);

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
