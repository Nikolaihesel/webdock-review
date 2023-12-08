const express = require("express");
const express = require("express");

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
} = require("../controllers/postControllers");
const router = express.Router();

//get all specific user posts
router.get("/user/:userId", getUsersPost);
router.get("/user/:userId", getUsersPost);

//Add likes
router.patch("/:id/likes", addLikeToPost);

router.get("/search", getSearchRequest);

// Get single post
router.get("/:id", getPost);
router.get("/:id", getPost);

// Get all posts
router.get("/", getPosts);
router.get("/", getPosts);

// Create a new post
router.post("/", createPost);
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);
router.delete("/:id", deletePost);

// UPDATE post
router.patch("/:id", updatePost);
router.patch("/:id", updatePost);

//CREATE comment
router.post("/:id/comment", createPostComment);
router.post("/:id/comment", createPostComment);

//CHANGE status
router.patch("/:id/status", handleStatusChange);

//GET an email
router.get(""); // skal tilføjes

module.exports = router;
