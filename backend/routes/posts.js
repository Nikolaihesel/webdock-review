const express = require("express");
const { getPosts, getPost, createPost } = require("../controllers/postControllers");
const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

module.exports = router;
