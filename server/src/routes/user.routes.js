import express from "express";

import {
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/user.controller";

import checkToken from "../middlewares/checkToken";

const router = express.Router();

/**
 * @route  POST /api/users/register
 * @desc   Register user
 * @access Public
 */

router.post("/register", userRegister);

/**
 * @route  POST /api/users/login
 * @desc   Login user
 * @access Public
 */
router.post("/login", userLogin);

/**
 * @route GET /api/users/profile
 * @desc get user profile
 * @access Private
 */

router.get("/profile", checkToken, userProfile);

export default router;
