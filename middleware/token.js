const secrets = require('config').get('secrets');
const jwt = require('jsonwebtoken');

const generateToken = ({ id, username, role }) =>
  jwt.sign(
    { subject: id, username, role },
    process.env.JWT_SECRET || secrets.jwt,
    { expiresIn: '1d' }
  );

module.exports = generateToken;
