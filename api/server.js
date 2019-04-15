// Handle async catch errors from one source.
require('express-async-errors');

const server = require('express')();

require('../middleware')(server);

require('../routes')(server);

module.exports = server;
