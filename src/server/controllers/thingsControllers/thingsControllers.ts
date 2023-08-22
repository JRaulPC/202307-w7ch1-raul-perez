import { type NextFunction, type Request, type Response } from "express";
import knownThings from "../../data/things.js";
import CustomError from "../CustomError/CustomError.js";

export const getThingsController = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.status(200)) {
    next(new CustomError("Things not found", 404));

    return;
  }

  res.status(200).json({ knownThings });
};

export const getThingByIdController = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const foundThing = knownThings.find((thing) => thing.id === Number(idThing));

  res.status(200).json(foundThing);
};

export const deleteThingByIdController = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = knownThings.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  knownThings.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: `Thing nº${idThing} got deleted` });
};
