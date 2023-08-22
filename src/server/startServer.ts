import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("things:server:start");

const startServer = (port: string | number) => {
  app.listen(Number(port), () => {
    debug(`Listening on http://localhost:${port}/things`);
  });
};

export default startServer;
