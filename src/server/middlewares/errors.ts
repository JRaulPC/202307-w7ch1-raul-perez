import { type NextFunction } from "express";

export const endpointNotFound = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundError = new Error("Endpoint not found");

  next(notFoundError);
};
