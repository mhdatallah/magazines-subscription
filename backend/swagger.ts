import swaggerJsdoc from 'swagger-jsdoc';

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Magazine Subscription API',
      version: '1.0.0',
    },
  },
  apis: ['api-doc.yaml'],
});

export default specs;
