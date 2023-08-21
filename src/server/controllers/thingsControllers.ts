import { type NextFunction, type Request, type Response } from "express";
import knownThings from "../data/things.js";

export const getThings = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ knownThings });
};
