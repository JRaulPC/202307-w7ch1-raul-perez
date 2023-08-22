import { type Request, type Response } from "express";
import { getThingsController } from "./thingsControllers.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const expectedStatusCode = 200;

describe("Given a getThingsController controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call its method status with 200", () => {
      getThingsController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", () => {
      getThingsController(req as Request, res as Response);

      const timesCalled = 1;

      expect(res.json).toHaveBeenCalledTimes(timesCalled);
    });
  });
});
