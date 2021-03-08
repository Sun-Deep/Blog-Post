import logger from "../config/logger";
import { isEmpty } from "../helpers/isEmpty";
import { Blog } from "../models/blog.model";

/**
 * @desc  Register Blog
 */

const blogRegister = async (req, res, next) => {
  let blogInfo = req.body;
  try {
    const blog = await new Blog(blogInfo).save();
    res.status(201).json({
      data: blog,
    });
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc get all blogs
 */

const getBlogs = async (req, res, next) => {
  try {
    let blogs = await Blog.find().populate("_user");
    if (!isEmpty(blogs)) {
      return res.status(200).json({
        data: blogs,
      });
    } else {
      return res.status(404).json({
        error: {
          message: "No blogs to show.",
        },
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc get blog by id
 */

const getBlogById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let blogs = await Blog.find({
      _id: id,
    }).populate("_user");
    if (!isEmpty(blogs)) {
      return res.status(200).json({
        data: blogs[0],
      });
    } else {
      return res.status(404).json({
        error: {
          message: "No blogs to show.",
        },
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc update blog by blog id
 */

const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const _id = req.params.id;

    let blog = await Blog.findById({ _id });

    if (blog._user == req.profile._id) {
      let blogs = await Blog.findByIdAndUpdate(
        { _id },
        { title, content },
        { new: true }
      );
      return res.status(201).json({
        data: blogs,
      });
    } else {
      return res.status(401).json({
        error: {
          message: "You are not authorized to do this operation",
        },
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc get blog bu\y blog id
 */

const deleteBlog = async (req, res, next) => {
  try {
    const _id = req.params.id;
    let blog = await Blog.findById({ _id });
    if (blog._user == req.profile._id) {
      const deletedBlog = await Blog.findByIdAndDelete({ _id });
      console.log(deleteBlog);
      return res.status(201).json({
        data: deletedBlog,
      });
    } else {
      return res.status(401).json({
        error: {
          message: "You are not authorized to do this operation",
        },
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc get blogs of particular user
 */

const getBlogsByUser = async (req, res, next) => {
  try {
    const { _id } = req.profile;
    let blogs = await Blog.find({ _user: _id }).populate("_user");
    if (!isEmpty(blogs)) {
      return res.status(200).json({
        data: blogs,
      });
    } else {
      return res.status(404).json({
        error: {
          message: "No blogs to show.",
        },
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

export {
  blogRegister,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
};
