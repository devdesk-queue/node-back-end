const secrets = require('config').get('secrets');
const jwt = require('jsonwebtoken');

const generateToken = ({ id, username, role }) =>
  jwt.sign(
    // token payload
    { subject: id, username, role },
    // token secret
    process.env.JWT_SECRET || secrets.jwt,
    // token options
    { expiresIn: '1d' }
  );

module.exports = generateToken;
