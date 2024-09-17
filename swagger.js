const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração da documentação Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cálculo',
      version: '1.0.0',
      description: 'Uma API simples para realizar cálculos matemáticos',
    },
    servers: [
      {
        url: 'http://172.16.7.1:9090',
        description: 'Servidor',
      },
    ],
  },
  apis: ['./index.js'], // Caminho para o arquivo onde estão as anotações de API
};

const specs = swaggerJsdoc(options);

// Exporte diretamente a configuração do Swagger UI
module.exports = { swaggerUi, specs };
