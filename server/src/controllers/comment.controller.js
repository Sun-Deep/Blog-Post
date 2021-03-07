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

const replyRegister = async (req, res, next) => {
  let { _id, _user, content } = req.body;
  try {
    await Comment.updateOne(
      { _id: _id },
      {
        $push: {
          replies: {
            _user: _user,
            content: content,
          },
        },
      },
      {
        new: true,
      }
    );

    const comment = await Comment.findById({ _id: _id });
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

export { commentRegister, getComments, replyRegister };
