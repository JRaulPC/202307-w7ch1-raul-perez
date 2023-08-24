import { Schema, model } from "mongoose";
import { type ThingStructure } from "../../types";

const thingSchema = new Schema<ThingStructure>({
  name: {
    type: String,
    required: true,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
});

const Thing = model("Thing", thingSchema, "things");

export default Thing;
