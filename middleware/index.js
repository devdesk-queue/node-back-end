const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// adding note to make changes

module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors());
  server.use(express.json());
};
