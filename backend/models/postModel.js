const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		feature_request_id: { type: String },
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
			enum: ['Under Review', 'Planned', 'In Progress', 'Completed', 'Closed'],
			default: 'Under Review',
		},
		tags: {
			type: Array,
			required: false,
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
				type: String,
			},
		],
	},
	{ timestamps: true }
);

postSchema.index({ title: 'text' });

module.exports = mongoose.model('postModel', postSchema);
