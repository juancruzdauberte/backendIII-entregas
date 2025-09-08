import express, { json, urlencoded } from "express";
import { connectDB } from "../db/db.js";
import mockingRoutes from "../routes/mocks.routes.js";
import usersRoutes from "../routes/user.routes.js";
import petsRoutes from "../routes/pets.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger.config.js";

export const app = express();

connectDB();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/mocks", mockingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/pets", petsRoutes);
