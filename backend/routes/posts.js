const express = require("express");
const {
  getPosts,

  getPost,
  createPost,
  deletePost,
  updatePost,
  createPostComment,
} = require("../controllers/postControllers");
const router = express.Router();

// Get single post
router.get("/:id", getPost);

// Get all posts
router.get("/", getPosts);

// Create a new post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

// UPDATE post
router.patch("/:id", updatePost);

//CREATE comment
router.post("/:id/comment", createPostComment);

module.exports = router;
