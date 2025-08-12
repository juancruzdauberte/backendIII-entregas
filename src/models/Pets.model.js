import { Schema, model } from "mongoose";

const PetSchema = Schema({
  race: String,
});

export const PetModel = model("pets", PetSchema);
