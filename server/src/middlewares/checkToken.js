import jwt from "jsonwebtoken";
import config from "../config/config";

const checkToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: {
            message: "Access denied. Please login.",
          },
        });
      }
      req.profile = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: {
        message: "Access denied. Please login.",
      },
    });
  }
};

export default checkToken;
