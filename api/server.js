// Handle async catch errors from one source.
require('express-async-errors');
require('dotenv').config();

const server = require('express')();

require('../middleware')(server);

require('../routes')(server);

module.exports = server;
