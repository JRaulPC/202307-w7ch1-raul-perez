import type { Request } from "express";

export type ParamIdRequest = Request<{ userId: string }>;
