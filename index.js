require('dotenv').config();
const server = require('./api/server');


const port = process.env.PORT;

server.listen(port, () => console.log(`=== Listening on port ${port} in ${server.settings.env} mode ===`));
