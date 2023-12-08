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
	handleStatusChange,
	getSearchRequest,
	addTagsToPost,
	updatePostTags,
	getPostStatus,
} = require('../controllers/postControllers');

const router = express.Router();

//get all specific user posts
router.get('/user/:userId', getUsersPost);

router.get('/featureStatus', getPostStatus)

//add like to post
router.patch('/:id/likes', addLikeToPost);

//search for specific post
router.get('/search', getSearchRequest);

// Add tags to post
router.post('/:id/tags', addTagsToPost);

// Update tags of a post
router.patch('/:id/tags', updatePostTags);

// Search
router.get('/search', getSearchRequest);

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

// //CHANGE status
// router.patch('/:id/status', handleStatusChange);



module.exports = router;
