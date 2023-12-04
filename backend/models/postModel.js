const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    featureStatus: {
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
    comments: [
      //array siger der er flere comments
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel",
      },
    ],
    upvotes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//mongoose pluralises module names, therefor the missing 's'
module.exports = mongoose.model("postModel", postSchema);
