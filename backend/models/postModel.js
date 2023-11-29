const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			required: true,
		},
		bodyText: {
			type: String,
			required: true,
		},
		user: {
			type: Object,
			required: true,
		},
		comments: {
			type: Array,
			required: false,
		},
	},
	{ timestamps: true }
);

//mongoose pluralises module names, therefor the missing 's'
module.exports = mongoose.model('postModel', postSchema);
