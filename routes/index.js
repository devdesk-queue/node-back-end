const { logger, errorLogger } = require('../middleware/winston');
const auth = require('./auth');
const tickets = require('./tickets');
const categories = require('./categories');

module.exports = server => {
  server.use(logger);

  server.use('/api/auth', auth);
  server.use('/api/tickets', tickets);
  server.use('/api/categories', categories);
  server.get(/\/(?:api)?/, (req, res) => {
    res.status(200).json({ message: 'Server up & running!' });
  });

  server.use(errorLogger);
};
