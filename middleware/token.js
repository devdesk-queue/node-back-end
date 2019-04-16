const secrets = require('config').get('secrets');
const jwt = require('jsonwebtoken');

const generateToken = ({ id, username }) =>
  jwt.sign(
    { subject: id, username },
    process.env.JWT_SECRET || secrets.jwt,
    { expiresIn: '1d' }
  );

module.exports = generateToken;
