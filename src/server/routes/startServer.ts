import app from "./index.js";

const startServer = (port: string | number) => {
  app.listen(Number(port), () => {
    console.log(`Listening on "endpoint"`);
  });
};

export default startServer;
