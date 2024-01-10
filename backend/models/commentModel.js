// Importing necessary modules from the mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the schema for the Comment model
const commentSchema = new Schema(
	{
		// Comment text field, must be present
		bodyText: {
			type: String,
			required: true,
		},

		// User details associated with the comment
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

		// Reference to the associated post using its ObjectId
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'postModel',
		},
	},
	// Adding timestamps for createdAt and updatedAt
	{ timestamps: true }
);

// Creating and exporting the Comment model based on the schema
module.exports = mongoose.model('commentModel', commentSchema);
