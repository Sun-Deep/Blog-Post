import { Schema, model } from "mongoose";
import autoPopulate from "../helpers/autoPopulate";

const commentSchema = new Schema(
  {
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
    _blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    _reply: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export { Comment };
