import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
