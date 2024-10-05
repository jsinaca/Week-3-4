const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Week 3 and 4',
        description: 'CSE341'
    },
    host: 'week-3-4-12k8.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endpointFiles = ['./source/routers/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);