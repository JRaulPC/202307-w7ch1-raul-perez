import express from "express";
import { getThingById, getThings } from "../controllers/thingsControllers.js";

export const thingsRoutes = express.Router();

thingsRoutes.get("/", getThings);
thingsRoutes.get("/:idThing", getThingById);

export default thingsRoutes;
