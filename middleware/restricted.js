const secrets = require('config').get('secrets');
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || secrets.jwt;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};
