const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      index: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    avatar: {
      type: String
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

module.exports = mongoose.model("users", Users);