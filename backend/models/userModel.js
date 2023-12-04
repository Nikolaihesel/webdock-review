const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
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
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'postModel',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('userModel', userSchema);
