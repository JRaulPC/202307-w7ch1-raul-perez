import type { Request } from "express";

export type ParamIdRequest = Request<{ idThing: string }>;

export interface ThingStructure {
  id: string;
  name: string;
  inProgress: boolean;
}
