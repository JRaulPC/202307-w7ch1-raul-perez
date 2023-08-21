import { type Request, type Response } from "express";
import knownThings from "../data/things.js";

export const getThings = (_req: Request, res: Response) => {
  res.status(200).json({ knownThings });
};

export const getThingById = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const foundThing = knownThings.find((thing) => thing.id === Number(idThing));

  res.status(200).json(foundThing);
};
