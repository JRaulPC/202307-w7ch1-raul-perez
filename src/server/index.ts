import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import thingsRoutes from "./routes/thingsRoutes.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/things", thingsRoutes);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
