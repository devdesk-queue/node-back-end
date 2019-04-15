const express = require('express');
const middleware = require('./middleware/middleware');
const ticketsRouter = require('./routing/tickets');
require('dotenv').config();

// Define variables
const app = express();
const ticketsUrl = '/api/tickets';

// Middleware
middleware(app);

app.get('/', (req, res) => {
  res.status(200).json('API is live');
});

app.use(ticketsUrl, ticketsRouter);

module.exports = app;
