const postMarkup = require("../models/postModel");
const mongoose = require("mongoose");

// Hent alle posts
const getPosts = async (req, res) => {
  const posts = await postMarkup.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

//Get single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post found" });
  }

  const post = await postMarkup.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post found" });
  }

  res.status(200).json(post);
};

// create a new post
const createPost = async (req, res) => {
  const {title, featureStatus, bodyText, user, comments} = req.body

  // add to the database
  try {
    const post = await postMarkup.create({ title, featureStatus, bodyText, user, comments })
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
};
