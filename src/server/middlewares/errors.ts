import { default as debug, default as debugCreator } from "debug";
import { type NextFunction, type Response } from "express";
import CustomError from "../controllers/CustomError/CustomError";

debugCreator("things:server:errors");

export const endpointNotFound = (
  _req: Response,
  res: Response,
  next: NextFunction
) => {
  const notFoundError = new CustomError("Endpoint not found", 404);

  next(notFoundError);
};

export const generalErrorHandler = (
  error: CustomError,
  req: Response,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const errorMessage = error.message || "Petada";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
