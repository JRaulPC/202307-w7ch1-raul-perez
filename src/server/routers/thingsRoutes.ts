import express from "express";
import {
  createThingByBody,
  deleteThingById,
  getThingById,
  getThings,
} from "../controllers/thingsControllers.js";

export const thingsRoutes = express.Router();

thingsRoutes.get("/", getThings);
thingsRoutes.get("/:idThing", getThingById);
thingsRoutes.delete("/:idThing", deleteThingById);

thingsRoutes.post("/", createThingByBody);

export default thingsRoutes;
