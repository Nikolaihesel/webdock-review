const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const mongoose = require("mongoose");
const { post } = require("../routes/posts");

// Hent alle posts
const getPosts = async (req, res) => {
  const posts = await postModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

//Get single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post found" });
  }

  const post = await postModel.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post found" });
  }

  res.status(200).json(post);
};

// create a new post
const createPost = async (req, res) => {
  const { title, featureStatus, bodyText, user, comments, upvotes } = req.body;

  // add post to the database
  try {
    const post = await postModel.create({
      title,
      featureStatus,
      bodyText,
      user,
      comments,
      upvotes,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete post from db
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const post = await postModel.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const post = await postModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

//Add comment to post
const createPostComment = async (req, res) => {
  const { id } = req.params; //destruct - tager værdier i en variable der hedder det samme
  const comment = new commentModel({
    bodyText: req.body.comment,
    post: id,
  });

  await comment.save(); //venter på db gemmer så den kan gå videre

  const postRelated = await postModel.findById(id);

  postRelated.comments.push(comment); //sætter noget lokalt i array
  await postRelated.save();

  res.status(200).json(comment);
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  createPostComment,
};
