import mongoose from "mongoose";

import config from "./config";
import logger from "./logger";

mongoose.Promise = global.Promise;

console.log(config.mongoUri);

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("DB connected");
  })
  .catch((err) => {
    logger.info("Unable to connect to database: " + err);
    process.exit(1);
  });
