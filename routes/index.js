// const { logger, errorLogger } = require('../middleware/winston');
const tickets = require('./tickets');

module.exports = server => {
  // server.use(logger);

  server.use('/api/tickets', tickets);
  server.get('/api', (req, res) => {
    res.status(200).json('API is live!');
  });

  // server.use(errorLogger);
};
