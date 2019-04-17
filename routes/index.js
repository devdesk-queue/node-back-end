const { logger, errorLogger } = require('../middleware/winston');
const auth = require('./auth');
const tickets = require('./tickets');
const categories = require('./categories');
const users = require('./users');
const roles = require('./roles');

module.exports = server => {
  server.use(logger);

  server.use('/api/auth', auth);
  server.use('/api/tickets', tickets);
  server.use('/api/categories', categories);
  server.use('/api/users', users);
  server.use('/api/roles', roles);
  server.get(/\/(?:api)?/, (req, res) => {
    res.status(200).json({ message: 'Server up & running!' });
  });

  server.use(errorLogger);
};
