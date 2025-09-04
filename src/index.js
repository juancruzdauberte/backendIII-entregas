import express, { json, urlencoded } from "express";
import { config } from "./config/config.js";
import { connectDB } from "./db/db.js";
import mockingRoutes from "./routes/mocks.routes.js";
import usersRoutes from "./routes/user.routes.js";
import petsRoutes from "./routes/pets.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

connectDB();
app.use(urlencoded({ extended: true }));
app.use(json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:8080",
        description: "Desarrollo",
      },
    ],
    info: {
      title: "API backend III",
      description: "API Rest entrega final backend III CoderHouse",
      version: "1.0.0",
    },
  },
  apis: ["./src/docs/*.yaml"],
  // apis: ["./src/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/mocks", mockingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/pets", petsRoutes);

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});
