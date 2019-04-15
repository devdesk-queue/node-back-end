const express = require('express');
const middleware = require('./middleware/middleware');
require('dotenv').config();

const app = express();
// Middleware
middleware(app);

app.get('/', (req, res) => {
  res.status(200).json('API is live');
});

module.exports = app;
