import { default as debugCreator } from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Thing from "../../database/models/Thing.js";
import { type ParamIdRequest } from "../../types.js";

const debug = debugCreator("things:server:error");

export const getThingsController = async (_req: Request, res: Response) => {
  const things = await Thing.find().exec();

  res.status(200).json({ things });
};

export const getThingByIdController = async (
  req: ParamIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { idThing } = req.params;

  try {
    const thing = await Thing.findById(idThing).exec();

    if (!thing) {
      const newError = new CustomError(
        "Error, can't find thing!",
        404,
        "Error, can't find thing!"
      );
      next(newError);
      debug(`Error, can't get thing with id ${idThing}`);
      return;
    }

    res.status(200).json({ thing });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Error, can't get thing",
      500,
      (error as Error).message
    );
    next(customError);
  }
};
