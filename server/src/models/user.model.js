import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logger from "../config/logger";
import config from "../config/config";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: "Email is required",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
      minlength: 5,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @desc Hash user password for new user and modified password
 */

userSchema.pre("save", function (next) {
  let userInfo = this;
  let saltRounds = 8;

  if (userInfo.isModified("password") || this.isNew) {
    bcrypt
      .hash(userInfo.password, saltRounds)
      .then((hashedPassword) => {
        userInfo.password = hashedPassword;
        next();
      })
      .catch((err) => {
        logger.info(err);
        next(err);
      });
  } else {
    next();
  }
});

/**
 * @desc compare password
 * @param string plain password
 * @return boolean
 */

userSchema.methods.comparePassword = function (plainPassword) {
  let userInfo = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, userInfo.password, (err, isMatched) => {
      if (err) reject(err);
      resolve(isMatched);
    });
  });
};

/**
 * @desc user token
 * @return {Object} user with token
 */

userSchema.methods.generateToken = function () {
  return new Promise(async (resolve, reject) => {
    let userInfo = this;
    let token = jwt.sign(
      { _id: userInfo._id.toHexString() },
      config.jwtSecret,
      {
        expiresIn: "1440m",
      }
    );
    userInfo.token = token;

    try {
      resolve(userInfo);
    } catch (error) {
      reject(error);
    }
  });
};

const User = model("User", userSchema);
export { User };
