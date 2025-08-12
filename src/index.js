import express, { json, urlencoded } from "express";
import { config } from "./config/config.js";
import { connectDB } from "./db/db.js";
import mockingRoutes from "./routes/mocks.routes.js";

const app = express();

connectDB();
app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});

app.use("/api/mocks", mockingRoutes);
