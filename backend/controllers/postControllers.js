// Import necessary modules and libraries
require('dotenv').config();
const https = require('https');
const postModel = require('../models/postModel'); // Importing Post model
const commentModel = require('../models/commentModel'); // Importing Comment model
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const postmark = require('postmark'); // Importing Postmark for email notifications

// Creating a Postmark client using the API key from environment variables
const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

// Function to get posts with a specific status
const getPostStatus = async (req, res) => {
	const { status } = req.query;
	try {
		// Fetch posts with the specified feature status and sort them by creation date
		const userPosts = await postModel
			.find({ featureStatus: status })
			.sort({ createdAt: -1 });
		res.json(userPosts);
	} catch (err) {
		console.error('Error fetching posts by status:', err);
		res
			.status(500)
			.json({ message: 'Error fetching posts by status', error: err.message });
	}
};

// Function to get all posts of a specific user using user ID
const getUsersPost = async (req, res) => {
	const { userId } = req.params;

	try {
		// Find and return all posts associated with the given user ID
		const userPosts = await postModel.find({ 'user.id': userId });
		res.json(userPosts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Function to add a like to a post
const addLikeToPost = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.body;

	// Check if the provided post ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such post found' });
	}

	try {
		// Find the post by ID
		let post = await postModel.findById(id);

		// Check if the post exists
		if (!post) {
			return res.status(404).json({ error: 'No such post found' });
		}

		// Check if the user has already liked the post
		if (post.likes.includes(userId)) {
			return res.status(400).json({ error: 'User already liked the post' });
		}

		// Add user ID to the likes array and increment the upvotes count
		post.likes.push(userId);
		post.upvotes += 1;
		post = await post.save();

		res.status(200).json({ message: 'Post liked successfully', post });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Function to add tags to the post
const addTagsToPost = async (postId, tags) => {
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		throw new Error('Invalid post ID');
	}

	try {
		// Find the post by ID and update its tags
		const post = await postModel.findById(postId);

		if (!post) {
			throw new Error('No such post found');
		}

		post.tags = tags;
		await post.save();

		return post;
	} catch (error) {
		throw new Error(error.message);
	}
};

// Function to update tags of a post (for admin)
const updatePostTags = async (req, res) => {
	const { id } = req.params;
	const { tags } = req.body;

	try {
		// Call the addTagsToPost function to update tags
		const updatedPost = await addTagsToPost(id, tags);

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Function to handle search requests
const getSearchRequest = async (req, res) => {
	const searchTerm = req.query.q; // Get search term from the query parameter

	try {
		// Use MongoDB text index for searching posts based on the search term
		const matchedPosts = await postModel.find({
			$text: { $search: searchTerm },
		});

		if (matchedPosts.length === 0) {
			return res.status(404).json({ error: 'No posts found' });
		}

		res.json(matchedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Function to get all posts sorted by creation date
const getPosts = async (req, res) => {
	try {
		// Fetch all posts and sort them by creation date
		const posts = await postModel.find({}).sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Function to get a single post by ID
const getPost = async (req, res) => {
	const { id } = req.params;

	// Check if the provided post ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such post found' });
	}

	// Find the post by ID and populate its comments
	const post = await postModel.findById(id).populate('comments');

	if (!post) {
		return res.status(404).json({ error: 'No such post found' });
	}

	res.status(200).json(post);
};

// Function to create a new post
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
		// Create a new post using the provided data
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

		// Send an email notification about the new post using Postmark
		await client.sendEmail({
			From: 'uclfeedback@webdock.io',
			To: 'nikolaihesel@icloud.com',
			Subject: 'New Post Created',
			TextBody: `A new post "${title}" has been created.`,
		});

		// Prepare data for making a request to a feature request endpoint
		const requestData = JSON.stringify({
			userID: user.id,
			title: title,
			description: bodyText,
			category: featureStatus,
		});

		// Make a request to the feature request endpoint
		const options = {
			hostname: 'webdock.io',
			port: 443,
			path: '/en/platform_data/feature_requests/new',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(requestData),
			},
		};

		const request = https.request(options, (response) => {
			let responseData = '';
			response.on('data', (chunk) => {
				responseData += chunk;
			});
			response.on('end', async () => {
				console.log('Response from feature request endpoint:', responseData);
				try {
					// Parse the response and update the feature_request_id in the post
					const parsedResponse = JSON.parse(responseData);
					const featureRequestId = parsedResponse.id;

					await postModel.findByIdAndUpdate(post._id, {
						feature_request_id: featureRequestId,
					});

					console.log(parsedResponse);
				} catch (parseError) {
					console.error('Error parsing response:', parseError);
				}
			});
		});

		request.on('error', (error) => {
			console.error('Error sending feature request:', error);

			res.status(500).json({ error: 'Internal Server Error' });
		});

		request.write(requestData);
		request.end();

		res.status(200).json(post);
	} catch (error) {
		console.error('Error creating post:', error);

		res.status(400).json({ error: error.message });
	}
};
// Function to delete a post from the database
const deletePost = async (req, res) => {
	const { id } = req.params;

	// Check if the provided post ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No such post' });
	}

	// Find and delete the post by ID
	const post = await postModel.findOneAndDelete({ _id: id });

	if (!post) {
		return res.status(400).json({ error: 'No such post' });
	}

	res.status(200).json(post);
};

// Function to update a post
const updatePost = async (req, res) => {
	const { id } = req.params;

	// Check if the provided post ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No such post' });
	}

	// Find and update the post by ID
	const post = await postModel.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!post) {
		return res.status(400).json({ error: 'No such post' });
	}

	res.status(200).json(post);
};

// Function to update post status by feature_request_id
const updatePostStatusByFeatureRequestId = async (req, res) => {
	const { feature_request_id, status } = req.body;

	try {
		// Find the post by the given feature_request_id
		const post = await postModel.findOne({
			feature_request_id: feature_request_id,
		});

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		// Update the status of the post using status field
		post.featureStatus = status;
		await post.save();

		return res
			.status(200)
			.json({ message: 'Post status updated successfully' });
	} catch (error) {
		console.error('Error updating post status:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Function to create a comment for a post
const createPostComment = async (req, res) => {
	const { id } = req.params;
	const comment = new commentModel({
		bodyText: req.body.bodyText,
		user: req.body.user,
		post: id,
	});

	await comment.save(); // Wait for the comment to be saved to the database


	const postRelated = await postModel.findById(id);

	// Add the comment to the post's comments array
	postRelated.comments.push(comment);
	await postRelated.save();

	res.status(200).json(comment);
};


// Function to handle status change for a post
const handleStatusChange = async (req, res) => {
	const { id } = req.params;
	const { newStatus } = req.body;
  
	try {
	  // Find the post by the given post ID
	  const post = await postModel.findById(id);
  
	  if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	  }
  
	  // Update the featureStatus field in your post model
	  post.featureStatus = newStatus;
  
	  // Save the updated post
	  await post.save();
  
	  return res.status(200).json({ message: 'Post status updated successfully', post });
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
};

// Exporting all the functions as module exports
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
	addTagsToPost,
	updatePostTags,
	getPostStatus,
	updatePostStatusByFeatureRequestId,
};
