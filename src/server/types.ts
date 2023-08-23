import type { Request } from "express";

export type ParamIdRequest = Request<{ idThing: string }>;
