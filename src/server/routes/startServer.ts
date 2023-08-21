import app from "./index.js";

const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(`Listening on "endpoint"`);
  });
};

export default startServer;
