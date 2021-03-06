import { Schema, model } from "mongoose";

const replySchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
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

const Reply = model("Reply", replySchema);
export { Reply };
