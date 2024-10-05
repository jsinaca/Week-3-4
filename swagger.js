const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Week 3 and 4',
        description: 'CSE341'
    },
    host: 'localhost:8080',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpointFiles = ['./source/routers/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);