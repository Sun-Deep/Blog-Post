/**
 * @desc  Reply to comment
 */

import logger from "../config/logger";
import { Reply } from "../models/reply.model";

const replyRegister = async (req, res, next) => {
  let replyInfo = req.body;
  try {
    await new Reply(replyInfo).save();
    res.status(201).json({
      message: "Replied successfully",
    });
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

const getReplies = async (req, res, next) => {
  let commentId = req.params.commentId;
  try {
    const replies = await Reply.find({
      _comment: commentId,
    }).populate("_comment", "_blog");
    res.status(201).json({
      data: replies,
    });
  } catch (err) {
    console.log(err);
    logger.info(err);
    next(err);
  }
};

export { replyRegister, getReplies };
