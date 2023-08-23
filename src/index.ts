import debugCreator from "debug";
import "dotenv/config";
import connectToDatabase from "./server/database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL;

const debug = debugCreator("things:server:");

try {
  await connectToDatabase(mongoDbUrl!);
  startServer(+port);

  debug("Connected to database");
} catch (error: unknown) {
  debug("Unable to connect to database");
  debug((error as Error).message);

  process.exit(1);
}
