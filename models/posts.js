const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Posts = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

const result = {
  Posts: mongoose.model("posts", Posts)
}

module.exports = result