import { Schema, model } from "mongoose";
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true,
    },
    content: {
      type: String,
      required: "Content is required",
      trim: true,
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);
export { Blog };
