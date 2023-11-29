const express = require("express");
const { getPosts, getPost } = require("../controllers/postControllers");
const router = express.Router();

// Get all posts
router.get("/", getPosts);

router.get("/:id", getPost);

module.exports = router;
