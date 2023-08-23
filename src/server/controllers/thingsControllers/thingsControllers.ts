import { default as debugCreator } from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import knownThings from "../../data/things.js";
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

  const thing = await Thing.findById(idThing).exec();

  if (typeof thing === "undefined") {
    next(new CustomError("Error, can't get thing", 404));
    debug(`Error, can't get thing with id ${idThing}`);
    return;
  }

  res.status(200).json({ thing });
};

export const deleteThingByIdController = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = knownThings.findIndex(
    (thing) => thing.id === +idThing
  );

  knownThings.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: `Thing nº${idThing} got deleted` });
};
