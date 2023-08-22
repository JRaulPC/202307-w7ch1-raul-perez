import express from "express";
import morgan from "morgan";
import { thingsRoutes } from "./thingsRoutes.js";

export const app = express();

app.get("/"); // PingController en la funcion

app.use(morgan("dev"));
app.use(express.json()); // Uuse solo puede recibir middlewares
app.use("/things", thingsRoutes);

export default app;
