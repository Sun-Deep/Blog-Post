import fs from "fs";
import path from "path";

import logger from "../config/logger";
import { isEmpty } from "../helpers/isEmpty";
import { User } from "../models/user.model";
import { pipeline } from "../helpers/saveImage";

/**
 * @desc  Register user
 */

const userRegister = async (req, res, next) => {
  let userInfo = req.body;
  console.log(req.body);
  const profilePicture = req.files.profilePicture;

  const fileName = `profilePicture_${Date.now()}${path.extname(
    profilePicture.name
  )}`;

  profilePicture.mv(
    `${__dirname}../../../upload/images/${fileName}`,
    function (err) {
      if (err) {
        logger.info(err);
        next(err);
        return;
      }
    }
  );

  userInfo.image = fileName;

  let user = await User.find({
    email: userInfo.email,
  });

  if (user.length > 0) {
    return res.status(409).json({
      error: {
        message: "This email address has already been used.",
      },
    });
  }

  // saving to database
  try {
    await new User(userInfo).save();
    res.status(201).json({
      message: "You have been registered successfully.",
    });
  } catch (error) {
    console.log(error);
    logger.info(error);
    next(error);
  }
};

/**
 * @desc Login User
 */

const userLogin = async (req, res, next) => {
  let userInfo = req.body;

  if (isEmpty(userInfo.email) || isEmpty(userInfo.password)) {
    return res.status(400).json({
      error: {
        message: "Email or password field is missing",
      },
    });
  }

  // check if user exits
  let user = await User.findOne({
    email: userInfo.email,
  });

  if (isEmpty(user)) {
    return res.status(404).json({
      error: {
        message: "Invalid email or password.",
      },
    });
  }

  // check is password is correct
  let isMatch = await user.comparePassword(userInfo.password);
  if (!isMatch) {
    return res.status(404).json({
      error: {
        message: "Invalid email or password.",
      },
    });
  }
  try {
    user.password = undefined;
    // generate token
    let userT = await user.generateToken();

    return res.status(200).json({
      data: {
        token: userT.token,
        user: user,
      },
    });
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

/**
 * @desc Get user profile
 */

const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.profile._id);
    if (!isEmpty(user)) {
      user.password = undefined;
      return res.status(200).json({
        data: user,
      });
    }
  } catch (err) {
    logger.info(err);
    next(err);
  }
};

export { userRegister, userLogin, userProfile };
