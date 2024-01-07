const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define the path where images will be saved

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
} = require('../controllers/postControllers');

const router = express.Router();

// Define your middleware to handle image upload
const uploadImage = upload.single('image');

// Routes

// Get post by status
router.get('/status', getPostStatus);

// Get all posts
router.get('/', getPosts);

// Get all specific user posts
router.get('/user/:userId', getUsersPost);

// Add like to post
router.patch('/:id/likes', addLikeToPost);

// Search for specific post
router.get('/search', getSearchRequest);

// Add tags to post
router.post('/:id/tags', addTagsToPost);

// Update tags of a post
router.patch('/:id/tags', updatePostTags);

// Get single post
router.get('/:id', getPost);

// Tilføjelse: Create a new post with image upload
router.post('/', uploadImage, createPost);

// Delete a post
router.delete('/:id', deletePost);

// Update post
router.patch('/:id', updatePost);

// Update feature request status
router.post('/update-feature-request-status', updatePostStatusByFeatureRequestId);

// Create comment
router.post('/:id/comments', createPostComment);

module.exports = router;
