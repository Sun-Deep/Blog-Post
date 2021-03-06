import server from "./server";
import config from "./config/config";
import logger from "./config/logger";
import "./config/database";

// assigning port
const PORT = config.port;

// starting server
server.listen(PORT, () => {
  logger.info(`App running on: ${PORT}`);
});
