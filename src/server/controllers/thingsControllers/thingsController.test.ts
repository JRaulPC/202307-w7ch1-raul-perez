import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import Thing from "../../database/models/Thing.js";

import { type ParamIdRequest, type ThingStructure } from "../../types.js";
import {
  getThingByIdController,
  getThingsController,
} from "./thingsControllers.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

const things: ThingStructure[] = [
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
});

describe("Given a getThingsController controller", () => {
  Thing.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(things),
  });

  describe("When it receives a request", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;
      await getThingsController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a collection of things", async () => {
      await getThingsController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ things });
    });
  });
});

describe("Given a getthingByIdController controller", () => {
  Thing.findById = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockedThing),
  });

  describe("When it receives a request with a hashed id as request parameter", () => {
    test("Then it should call it's json method with the thing 'testing' ", async () => {
      await getThingByIdController(
        req as ParamIdRequest,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ thing: mockedThing });
    });
  });

  describe("When it receives a request with 4 as request parameter", () => {
    test("Then it should throw a custom error with the message 'Error, can't get thing', and the status code 404", async () => {
      Thing.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      const newError = new CustomError(
        "Error, can't find thing!",
        404,
        "Error, can't find thing!"
      );

      await getThingByIdController(
        req as ParamIdRequest,
        res as Response,
        next
      );

      expect(next).toBeCalledWith(newError);
    });
  });
});
