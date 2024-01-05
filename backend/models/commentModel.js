const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    bodyText: {
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
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("commentModel", commentSchema);
