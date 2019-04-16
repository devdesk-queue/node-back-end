// require('dotenv').config();

const server = require('./api/server');
const port = process.env.PORT;

server.listen(port, () => {
  console.log('=== Listening on port %d in %s mode ===', port, server.settings.env);
});
