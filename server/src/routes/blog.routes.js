import express from "express";
import {
  blogRegister,
  deleteBlog,
  getBlogById,
  getBlogs,
  getBlogsByUser,
  updateBlog,
} from "../controllers/blog.controller";
import checkToken from "../middlewares/checkToken";

const router = express.Router();

/**
 * @route  POST /api/blogs/register
 * @desc   Register blog
 * @access Private
 */

router.post("/register", checkToken, blogRegister);

/**
 * @route  POST /api/blogs/
 * @desc   Get all blogs
 * @access Public
 */

router.get("/", getBlogs);

/**
 * @route  GET /api/blogs/user
 * @desc   Get blogs of specific user
 * @access Private
 */

router.get("/user", checkToken, getBlogsByUser);

/**
 * @route  POST /api/blogs/:id
 * @desc   Get Blog by ID
 * @access Public
 */

router.get("/:id", getBlogById);

/**
 * @route  PUT /api/blogs/:id
 * @desc   Update Blog by ID
 * @access Private
 */

router.put("/:id", checkToken, updateBlog);

/**
 * @route  Delete /api/blogs/:id
 * @desc   Delete Blog by ID
 * @access Private
 */

router.delete("/:id", checkToken, deleteBlog);

export default router;
