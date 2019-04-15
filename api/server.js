const express = require('express');
const middleware = require('./middleware/middleware');
const ticketsRouter = require('./routing/tickets');
const { serverError } = require('./middleware/error');
require('dotenv').config();

// Define variables
const app = express();
const ticketsUrl = '/api/tickets';

// Middleware
middleware(app);

// Default "home" route to check if the API is working
app.get('/', (req, res) => {
  res.status(200).json('API is live');
});

// Routes
app.use(ticketsUrl, ticketsRouter);

// Error handler middleware
app.use(serverError);

module.exports = app;
