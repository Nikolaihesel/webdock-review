const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		bodyText: {
			type: String,
			required: true,
		},
		featureStatus: {
			type: String,
			required: true,
		},
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
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'commentModel',
			},
		],
		upvotes: {
			type: Number,
			default: 0,
			required: true,
		},
		likes: [
			{
				type: String, // Type might vary based on the SSO user identifier
			},
		],
	},
	{ timestamps: true }
);

postSchema.index({ title: 'text' });

module.exports = mongoose.model('postModel', postSchema);
