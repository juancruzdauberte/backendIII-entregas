import { Schema, model } from "mongoose";

const PetSchema = Schema({
  race: String,
  name: String,
  isAdopted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
});

export const PetModel = model("pets", PetSchema);
