import express from "express";
import { getReplies, replyRegister } from "../controllers/reply.controller";

const router = express.Router();

/**
 * @route  POST /api/replies/register
 * @desc   Register comment
 * @access Public
 */

router.post("/register", replyRegister);
router.get("/:commentId", getReplies);

export default router;
