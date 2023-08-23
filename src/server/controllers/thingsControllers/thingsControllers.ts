import { default as debugCreator } from "debug";
import { type NextFunction, type Request, type Response } from "express";
import knownThings from "../../data/things.js";
import { type ParamIdRequest } from "../../types.js";
import CustomError from "../CustomError/CustomError.js";

const debug = debugCreator("things:server:error");

export const getThingsController = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ knownThings });
};

export const getThingByIdController = (
  req: ParamIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { idThing } = req.params;

  const foundThing = knownThings.find((thing) => thing.id === +idThing)!;

  if (typeof foundThing === "undefined") {
    next(new CustomError("Error, can't get thing", 404));
    debug(`Error, can't get thing with id ${idThing}`);
    return;
  }

  res.status(200).json(foundThing);
};

export const deleteThingByIdController = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = knownThings.findIndex(
    (thing) => thing.id === +idThing
  );

  knownThings.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: `Thing nº${idThing} got deleted` });
};
