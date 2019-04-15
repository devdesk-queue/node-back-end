const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// adding note to make changes

module.exports = app => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
};
