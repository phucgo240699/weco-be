const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostAuthor = new Schema({
  name: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  }
}, { timestamps: true })

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
      ref: 'PostAuthor',
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
  Posts: mongoose.model("posts", Posts),
  PostAuthor: mongoose.model("postsAuthor", PostAuthor)
}

module.exports = result