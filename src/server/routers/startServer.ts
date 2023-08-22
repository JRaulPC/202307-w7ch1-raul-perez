import chalk from "chalk";
import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("things:server:start");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on http://localhost:${port}/things`));
  });
};

export default startServer;
