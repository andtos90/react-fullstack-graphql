const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String
  },
  { _id: true, autoIndex: true }
);

const User = mongoose.model("User", UserSchema);

const PostSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    isPublished: Boolean
  },
  { _id: true, autoIndex: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { User, Post };
