import express from "express";
import { getThings } from "../controllers/thingsControllers.js";

export const thingsRoutes = express.Router();

thingsRoutes.get("/things", getThings);

export default thingsRoutes;
