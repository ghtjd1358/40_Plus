// swagger/swagger.js

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "TEST API",
      description: "Swagger API 문서화 테스트 중",
    },
    servers: [
      {
        url: "http://localhost:8000", // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger 주석이 있는 파일들의 경로
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
