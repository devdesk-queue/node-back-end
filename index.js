const server = require('./api/server');

const port = process.env.PORT || 9000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('=== Listening on port %d in %s mode ===', port, server.settings.env);
});
