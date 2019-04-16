require('dotenv').config();
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ message: 'it sorta works' });
});

// const server = require('./api/server');
const port = process.env.PORT;



server.listen(port, () => {
  console.log('=== Listening on port %d in %s mode ===', port, server.settings.env);
});
