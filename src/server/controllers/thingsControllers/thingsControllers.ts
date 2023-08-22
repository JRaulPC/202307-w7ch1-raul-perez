import { type Request, type Response } from "express";
import knownThings from "../../data/things.js";
import { type Thing } from "../../data/types";
import { type CustomRequest } from "../types";

export const getThingsController = (_req: Request, res: Response) => {
  console.log("Things got delivered by GET method.");

  res.status(200).json({ knownThings });
};

export const getThingByIdController = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const foundThing = knownThings.find((thing) => thing.id === Number(idThing));

  console.log("Thing got delivered by GET method.");

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

export const createThingController = (
  req: CustomRequest<Thing>,
  res: Response
) => {
  const newThing: Thing = req.body;

  if (!newThing) {
    return new Error("value must be defined");
  }

  const newThings = [...knownThings, newThing];

  console.log(req.body);
  res.status(201).json(newThings);
};
