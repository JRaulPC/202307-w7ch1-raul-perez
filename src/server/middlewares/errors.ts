import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

export const endpointNotFound = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const endpointError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found"
  );

  next(endpointError);
};

export const generalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorMessage = error.message || "";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
