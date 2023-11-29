const postMarkup = require("../models/postModel");
const mongoose = require("mongoose");

// Hent alle posts
const getPosts = async (req, res) => {
  const posts = await postMarkup.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

module.exports = {
  getPosts,
};
