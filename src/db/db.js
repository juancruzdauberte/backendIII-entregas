import mongoose from "mongoose";
import { envConfig } from "../config/env.config.js";
import { exit } from "node:process";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(envConfig.MONGO_URI);
    const url = `${conn.connection.host}:${conn.connection.port}`;
    console.log(`MongoDB conectado ${url}`);
  } catch (error) {
    console.log("Error al conectar mongo ", error);
    exit(1);
  }
}
