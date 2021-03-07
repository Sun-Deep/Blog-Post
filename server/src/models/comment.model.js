import { Schema, model } from "mongoose";
import autoPopulate from "../helpers/autoPopulate";

const replySchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export { Comment };
