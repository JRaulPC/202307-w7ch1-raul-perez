import { type Request } from "express";

export interface CustomRequest<Thing> extends Request {
  body: Thing;
}
