const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    isPublished: Boolean
  },
  { _id: true, autoIndex: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
