import swaggerJSDoc from "swagger-jsdoc";

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
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
