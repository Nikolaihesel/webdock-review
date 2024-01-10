// Importing the Express framework
const express = require('express');

// Importing the various controller functions from postControllers
const {
	getPosts,
	getPost,
	createPost,
	deletePost,
	updatePost,
	createPostComment,
	getUsersPost,
	addLikeToPost,
	updatePostStatusByFeatureRequestId,
	getSearchRequest,
	addTagsToPost,
	updatePostTags,
	getPostStatus,
	handleStatusChange,
} = require('../controllers/postControllers');

// Creating an Express Router
const router = express.Router();

// Route to get posts by status
router.get('/status', getPostStatus);

// Route to get all posts
router.get('/', getPosts);

// Route to get all posts of a specific user
router.get('/user/:userId', getUsersPost);

// Route to add a like to a post
router.patch('/:id/likes', addLikeToPost);

// Route to search for specific posts
router.get('/search', getSearchRequest);

// Route to add tags to a post
router.post('/:id/tags', addTagsToPost);

// Route to update tags of a post
router.patch('/:id/tags', updatePostTags);

// Route to get a single post by ID
router.get('/:id', getPost);

// Route to create a new post
router.post('/', createPost);

// Route to delete a post by ID
router.delete('/:id', deletePost);

// Route to update a post by ID
router.patch('/:id', updatePost);

// Route to update post status by feature_request_id
router.post(
	'/update-feature-request-status',
	updatePostStatusByFeatureRequestId
);

// Route to create a comment for a post
router.post('/:id/comments', createPostComment);

// Route to change the status of a post
router.patch('/:id/status', handleStatusChange);

// Exporting the router for use in the application
module.exports = router;
