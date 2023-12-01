const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    bodyText: {
      type: String,
      required: true,
    },

    user: {
      type: Object,
      required: false,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("commentModel", commentSchema);
