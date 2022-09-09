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
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", Posts);