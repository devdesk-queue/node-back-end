const server = require('./api/server');

const port = process.env.port || 9000;

server.listen(port, () => {
  console.log('=== Listening on port %d in %s mode ===', port, server.settings.env);
});
