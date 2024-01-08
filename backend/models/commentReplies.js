const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema(
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
    type: String,
    required: true,
    },
    parentComment: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("replyModel", replySchema);
