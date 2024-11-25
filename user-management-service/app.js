const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const session = require('express-session')
require('dotenv').config()
const config = require(`./config/env/${process.env.NODE_ENV}.json`)

require('./config/passport')(passport);

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(session({ secret: config.google.googleClientSecret }))
app.use(passport.initialize());

// Swagger documentation setup
const swaggerOptions = {
    swaggerDefinition: { openapi: '3.0.0', info: { title: 'User Management API', version: '1.0.0' } },
    apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs/users', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use(errorHandler);

module.exports = app;
