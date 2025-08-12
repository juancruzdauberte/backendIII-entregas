import { model, Schema } from "mongoose";

const UserSchema = Schema({
  role: {
    type: String,
    required: true,
    trim: true,
  },
  pets: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
});

export const UserModel = model("users", UserSchema);
