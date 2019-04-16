// Handle async catch errors from one source.
// require('express-async-errors');
const server = require('express')();
// require('../middleware')(server);
// require('../routes')(server);
server.get('/', (req, res) => {
    res.status(200).json({ message: 'It works' });
});

module.exports = server;
