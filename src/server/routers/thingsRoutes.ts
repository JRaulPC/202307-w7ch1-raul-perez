import express from "express";
import {
  getThingByIdController,
  getThingsController,
} from "../controllers/thingsControllers/thingsControllers.js";

export const thingsRoutes = express.Router();

thingsRoutes.get("/", getThingsController);
thingsRoutes.get("/:idThing", getThingByIdController);

export default thingsRoutes;
