import mongoose from "mongoose";
import { config } from "../config/config.js";
import { exit } from "node:process";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    const url = `${conn.connection.host}:${conn.connection.port}`;
    console.log(`MongoDB conectado ${url}`);
  } catch (error) {
    console.log("Error al conectar mongo ", error);
    exit(1);
  }
}
