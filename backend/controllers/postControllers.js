const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const mongoose = require("mongoose");

//GET all posts of user with ID
const getUsersPost = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await postModel.find({ "user.id": userId });
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET all posts with status being x
const getPostStatus = async (req, res) => {
  const { featureStatus } = req.query;

  try {
    const userPosts = await postModel.find({ featureStatus: featureStatus });
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add like to post
const addLikeToPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post found" });
  }

  try {
    let post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "No such post found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "User already liked the post" });
    }

    post.likes.push(userId);
    post.upvotes += 1;
    post = await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Search request
const getSearchRequest = async (req, res) => {
  const searchTerm = req.query.q; // get search term from the query parameter

  try {
    const matchedPosts = await postModel.find({
      $text: { $search: searchTerm }, // use mongoDB text index
    });

    if (matchedPosts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    res.json(matchedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

  const post = await postModel.findById(id).populate("comments");

  if (!post) {
    return res.status(404).json({ error: "No such post found" });
  }

  res.status(200).json(post);
};

// create a new post
const createPost = async (req, res) => {
  const { title, status, bodyText, user, comments, upvotes } = req.body;

  // add post to the database
  try {
    const post = await postModel.create({
      title,
      status,
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

const handleStatusChange = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post found" });
  }

  try {
    let post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "No such post found" });
    }

    // Update the status field in your post model
    post.status = newStatus;

    // Save the updated post
    post = await post.save();

    res.status(200).json({ message: "Post status updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
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
  getPostStatus,
};
