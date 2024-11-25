const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
require('dotenv').config()
const config = require(`./config/env/${process.env.NODE_ENV}.json`)

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

// Swagger documentation setup
const swaggerOptions = {
    swaggerDefinition: { openapi: '3.0.0', info: { title: 'User Management API', version: '1.0.0' } },
    apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs/notification', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/notification', notificationRoutes);
app.use(errorHandler);

module.exports = app;
