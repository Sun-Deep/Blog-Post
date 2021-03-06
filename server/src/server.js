require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import fileupload from "express-fileupload";

import apiRoutes from "./routes";
import config from "./config/config";

const server = express();
server.use(cors());

server.use(fileupload({ createParentPath: true }));
server.use(helmet());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

if (config.env !== "production") {
  server.use(morgan("dev"));
}

// serving as static folder
server.use(express.static("upload/images"));

// Routes
server.use("/api", apiRoutes);

// 404 Error Handler
server.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Internal Error Handler
server.use((err, req, res, next) => {
  const status_code = err.status || 500;
  console.log(err);
  res.status(status_code).json({
    error: {
      message: res.status === 404 ? err.message : "Something Went Wrong",
    },
  });
});

export default server;
