const server = require('./api/server');

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`=== Listening on port ${port} in ${server.settings.env} mode ===`, server.settings.env));
