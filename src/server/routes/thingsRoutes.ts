import express from "express";
import {
  deleteThingByIdController,
  getThingByIdController,
  getThingsController,
} from "../controllers/thingsControllers/thingsControllers.js";

export const thingsRoutes = express.Router();

thingsRoutes.get("/", getThingsController);
thingsRoutes.get("/:idThing", getThingByIdController);
thingsRoutes.delete("/:idThing", deleteThingByIdController);

export default thingsRoutes;
