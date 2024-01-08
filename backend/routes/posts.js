const express = require("express");

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  createPostComment,
  createPostReply,
  //getPostComment,
  getUsersPost,
  addLikeToPost,
  updatePostStatusByFeatureRequestId,
  getSearchRequest,
  addTagsToPost,
  updatePostTags,
  getPostStatus,
  handleCommentDelete,
} = require("../controllers/postControllers");

const router = express.Router();

// CREATE comment reply (for replies to comments)
router.post('/replies', createPostReply);

//get post by status
router.get("/status", getPostStatus);

// Get all posts
router.get("/", getPosts);

//get all specific user posts
router.get("/user/:userId", getUsersPost);

//add like to post
router.patch("/:id/likes", addLikeToPost);

//search for specific post
router.get("/search", getSearchRequest);

// Add tags to post
router.post("/:id/tags", addTagsToPost);

// Update tags of a post
router.patch("/:id/tags", updatePostTags);

// Get single post
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

// UPDATE post
router.patch("/:id", updatePost);

router.post(
  "/update-feature-request-status",
  updatePostStatusByFeatureRequestId
);

//CREATE comment
router.post("/:id/comments", createPostComment);

//DELETE comment
router.delete("/:id/comments/:commentId", handleCommentDelete);

// //CHANGE status
// router.patch('/:id/status', handleStatusChange);

module.exports = router;
