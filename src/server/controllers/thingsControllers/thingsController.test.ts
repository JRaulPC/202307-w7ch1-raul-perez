import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import Thing from "../../database/models/Thing.js";
import { type ThingStructure } from "../../database/types.js";
import { type ParamIdRequest } from "../../types.js";
import {
  getThingByIdController,
  getThingsController,
} from "./thingsControllers.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: Partial<NextFunction> = {};

const knownThings: ThingStructure[] = [
  { id: "1", name: "Anger management", inProgress: true },
  { id: "2", name: "React", inProgress: true },
  { id: "3", name: "No seguir copiando", inProgress: true },
];

const mockedThingId = new mongoose.Types.ObjectId().toString();

const req: Partial<ParamIdRequest> = {
  params: { idThing: mockedThingId },
};

const mockedThing: ThingStructure = {
  id: mockedThingId,
  name: "testing",
  inProgress: true,
};

beforeEach(() => {
  jest.clearAllMocks();
  Thing.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockedThing),
  });
});

describe("Given a getThingsController controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;
      await getThingsController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a collection of things", async () => {
      await getThingsController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ knownThings });
    });
  });
});

describe("Given a getthingByIdController controller", () => {
  describe("When it receives a request with 1 as request parameter", () => {
    test("Then it should call it's json method with a the thing 'anger management", async () => {
      const mockedThingId = new mongoose.Types.ObjectId().toString();

      const mockedThing: ThingStructure = {
        id: mockedThingId,
        name: "testing",
        inProgress: true,
      };

      await getThingByIdController(
        req as ParamIdRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(mockedThing);
    });
  });

  describe("When it receives a request with 4 as request parameter", () => {
    test("Then it should throw a custom error with the message 'Error, can't get thing', and the status code 404", async () => {
      const req: Partial<Request<{ idThing: string }>> = {
        params: { idThing: "4" },
      };
      const newError = new CustomError(
        "Error, can't get thing",
        404,
        "Error, can't get thing"
      );
      const next: Partial<NextFunction> = jest.fn();

      await getThingByIdController(
        req as ParamIdRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
