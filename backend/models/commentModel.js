const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		bodyText: {
			type: String,
			required: true,
		},
		replies: [
			{
				bodyText: String,
				user: {
					id: String,
					name: String,
					email: String,
				},
			},
		],

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

		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'postModel',
		},
	},
	{ timestamps: true }
);

commentSchema.statics.addReply = async function (commentId, reply) {
	return this.findByIdAndUpdate(
		commentId,
		{ $push: { replies: reply } },
		{ new: true }
	);
};

module.exports = mongoose.model('commentModel', commentSchema);
