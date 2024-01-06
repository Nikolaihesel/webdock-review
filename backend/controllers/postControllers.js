require("dotenv").config();
const https = require("https");
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const mongoose = require("mongoose");
const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

const getPostStatus = async (req, res) => {
  const { status } = req.query;
  try {
    const userPosts = await postModel
      .find({ featureStatus: status })
      .sort({ createdAt: -1 });
    res.json(userPosts);
  } catch (err) {
    console.error("Error fetching posts by status:", err);
    res
      .status(500)
      .json({ message: "Error fetching posts by status", error: err.message });
  }
};

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

// Function to add tags to the post
const addTagsToPost = async (postId, tags) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new Error("Invalid post ID");
  }

  try {
    const post = await postModel.findById(postId);

    if (!post) {
      throw new Error("No such post found");
    }

    post.tags = tags;
    await post.save();

    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

// update tags of a post, for admin later
const updatePostTags = async (req, res) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const updatedPost = await addTagsToPost(id, tags);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
  const {
    title,
    status,
    bodyText,
    user,
    comments,
    upvotes,
    tags,
    featureStatus,
    feature_request_id,
  } = req.body;

  try {
    const post = await postModel.create({
      title,
      status,
      featureStatus,
      bodyText,
      user,
      comments,
      upvotes,
      tags,
      feature_request_id,
    });

    await client.sendEmail({
      From: "uclfeedback@webdock.io",
      To: "nikolaihesel@icloud.com",
      Subject: "New Post Created",
      TextBody: `A new post "${title}" has been created.`,
    });

    const requestData = JSON.stringify({
      userID: user.id,
      title: title,
      description: bodyText,
      category: featureStatus,
    });

    const options = {
      hostname: "webdock.io",
      port: 443,
      path: "/en/platform_data/feature_requests/new",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestData),
      },
    };

    const request = https.request(options, (response) => {
      let responseData = "";
      response.on("data", (chunk) => {
        responseData += chunk;
      });
      response.on("end", async () => {
        console.log("Response from feature request endpoint:", responseData);
        try {
          const parsedResponse = JSON.parse(responseData);
          const featureRequestId = parsedResponse.id;

          await postModel.findByIdAndUpdate(post._id, {
            feature_request_id: featureRequestId,
          });

          console.log(parsedResponse);
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
        }
      });
    });

    request.on("error", (error) => {
      console.error("Error sending feature request:", error);

      res.status(500).json({ error: "Internal Server Error" });
    });

    request.write(requestData);
    request.end();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error creating post:", error);

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

const updatePostStatusByFeatureRequestId = async (req, res) => {
  const { feature_request_id, status } = req.body; // Matching field names

  try {
    // Find the post by the given feature_request_id
    const post = await postModel.findOne({
      feature_request_id: feature_request_id,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the status of the post using status field
    post.featureStatus = status; // Assigning status to featureStatus
    await post.save();

    return res
      .status(200)
      .json({ message: "Post status updated successfully" });
  } catch (error) {
    console.error("Error updating post status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Add comment to post
const createPostComment = async (req, res) => {
  const { id } = req.params; //destruct - tager værdier i en variable der hedder det samme
  const comment = new commentModel({
    bodyText: req.body.bodyText,
    user: req.body.user,
    post: id,
  });

  await comment.save(); //venter på db gemmer så den kan gå videre

  const postRelated = await postModel.findById(id);

  postRelated.comments.push(comment); //sætter noget lokalt i array
  await postRelated.save();

  res.status(200).json(comment);
};

const handleCommentDelete = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    // Use the deleteComment function to delete the comment
    const deletedComment = await commentModel.findOneAndDelete({
      _id: commentId,
      post: id,
    });

    res.status(200).json({
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyToComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { bodyText, user } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(postId) ||
    !mongoose.Types.ObjectId.isValid(commentId)
  ) {
    return res.status(404).json({ error: "Invalid post or comment ID" });
  }

  try {
    // Find the post to which the comment belongs
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "No such post found" });
    }

    // Find the comment to which the user wants to reply
    const parentComment = await commentModel.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ error: "No such comment found" });
    }

    // Create a new comment for the reply
    const replyComment = new commentModel({
      bodyText,
      user,
      post: postId,
      parentComment: commentId, // Reference to the parent comment
    });

    await replyComment.save();

    // Add the reply comment to the post's comments array
    post.comments.push(replyComment);

    // Save the updated post
    await post.save();

    res.status(200).json(replyComment);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const handleStatusChange = async (req, res) => {
//   const { id } = req.params;
//   const { newStatus } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such post found" });
//   }

//   try {
//     let post = await postModel.findById(id);

//     if (!post) {
//       return res.status(404).json({ error: "No such post found" });
//     }

//     // Update the status field in your post model
//     post.status = newStatus;

//     // Save the updated post
//     post = await post.save();

//     res.status(200).json({ message: "Post status updated successfully", post });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  createPostComment,
  getUsersPost,
  addLikeToPost,
  // handleStatusChange,
  getSearchRequest,
  addTagsToPost,
  updatePostTags,
  getPostStatus,
  updatePostStatusByFeatureRequestId,
  handleCommentDelete,
  replyToComment,
};
