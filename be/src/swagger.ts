import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to route files
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: any) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
