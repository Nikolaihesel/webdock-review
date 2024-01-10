// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Defining the schema for the Post model
const postSchema = new mongoose.Schema(
	{
		// Unique identifier for a feature request associated with the post
		feature_request_id: { type: String },

		// Title of the post, must be present
		title: {
			type: String,
			required: true,
		},

		// Body text of the post, must be present
		bodyText: {
			type: String,
			required: true,
		},

		// Status of the feature request post
		featureStatus: {
			type: String,
			enum: ['Under Review', 'In Progress', 'Implemented'],
			default: 'Under Review',
		},

		// Tags associated with the post (optional)
		tags: {
			type: Array,
			required: false,
		},

		// User details associated with the post
		user: {
			id: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
		},

		// Comments associated with the post, stored as an array of ObjectIds
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'commentModel',
			},
		],

		// Number of upvotes received for the post
		upvotes: {
			type: Number,
			default: 0,
			required: true,
		},

		// Array of user IDs who have liked the post
		likes: [
			{
				type: String,
			},
		],
	},
	// Adding timestamps for createdAt and updatedAt
	{ timestamps: true }
);

// Creating an index for full-text search on the title field
postSchema.index({ title: 'text' });

// Creating and exporting the Post model based on the schema
module.exports = mongoose.model('postModel', postSchema);
