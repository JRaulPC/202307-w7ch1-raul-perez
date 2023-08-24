import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../database/connectToDatabase";
import Thing from "../database/models/Thing";
import app from "../index.js";
import { type ThingStructure } from "../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  const dbUrl = server.getUri();
  await connectToDatabase(dbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Thing.deleteMany();
});

const mockedThings: ThingStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    name: "Testing",
    inProgress: true,
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    name: "React",
    inProgress: true,
  },
];

const expectedStatusCode = 200;

describe("Given a GET '/things' endpoint", () => {
  beforeEach(async () => {
    await Thing.create(mockedThings);
  });

  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and the things 'testing' and 'React' ", async () => {
      const response = await request(app)
        .get("/things")
        .expect(expectedStatusCode);

      const responseBody = response.body as { things: ThingStructure[] };

      mockedThings.forEach((thing, thingPosition) => {
        expect(responseBody.things[thingPosition]).toHaveProperty(
          "name",
          thing.name
        );
      });
    });
  });
});

describe("Given a GET '/things/:idThing endpoint'", () => {
  const mockedThing: ThingStructure = {
    id: new mongoose.Types.ObjectId().toString(),
    name: "testing",
    inProgress: true,
  };
  const idThing = mockedThing.id;

  beforeEach(async () => {
    await Thing.create(mockedThing);
  });

  describe("When it receives a request with the id of the thing 'testing'", () => {
    test("Then it should respond with status 200 and the thing 'testing'", async () => {
      const response = await request(app)
        .get(`/things/${idThing}`)
        .expect(expectedStatusCode);

      const responseBody = response.body as { thing: ThingStructure };

      expect(responseBody.thing).toHaveProperty("name", mockedThing.name);
    });

    test("Then it should respond with status 500 and error", async () => {
      const expectedStatus = 500;
      const errorMessage = "Error, can't get thing";
      const notIndexedId = 1;

      const response = await request(app)
        .get(`/things/${notIndexedId}`)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", errorMessage);
    });
  });
});
