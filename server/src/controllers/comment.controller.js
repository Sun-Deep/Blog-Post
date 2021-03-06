/**
 * @desc  Comment to blog
 */

import logger from "../config/logger";
import { Comment } from "../models/comment.model";

const commentRegister = async (req, res, next) => {
  let commentInfo = req.body;
  try {
    const comment = await new Comment(commentInfo).save();
    res.status(201).json({
      data: comment,
    });
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc Get list of comments by blog id
 */

const getComments = async (req, res, next) => {
  let blog_id = req.params.blogId;
  try {
    const comments = await Comment.find({
      _blog: blog_id,
    }).populate(["_blog", "_user"]);
    res.status(201).json({
      data: comments,
    });
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

export { commentRegister, getComments };
