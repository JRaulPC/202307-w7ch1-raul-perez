import express from "express";
import morgan from "morgan";
import { thingsRoutes } from "./thingsRoutes.js";

export const app = express();

app.use(morgan("dev"));

app.use("/things", thingsRoutes);

export default app;
