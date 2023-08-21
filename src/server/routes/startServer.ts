import app from "./index.js";

const startServer = (port: string | number) => {
  app.listen(Number(port), () => {
    console.log(`Listening on http://localhost:${port}/things `);
  });
};

export default startServer;
