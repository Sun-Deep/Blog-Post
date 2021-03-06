import express from "express";
import {
  commentRegister,
  getComments,
} from "../controllers/comment.controller";
import checkToken from "../middlewares/checkToken";

const router = express.Router();

/**
 * @route  POST /api/comments/register
 * @desc   Register comment
 * @access Private
 */

router.post("/register", checkToken, commentRegister);

/**
 * @route  POST /api/comments/:blogId
 * @desc   Get comments of blog
 * @access Public
 */

router.get("/:blogId", getComments);

export default router;
