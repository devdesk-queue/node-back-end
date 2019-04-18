const expressWinston = require('express-winston');
const winston = require('winston');

exports.logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './logs/server.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  statusLevels: false,
  level: (req, { statusCode }) => {
    let level = '';
    if (statusCode >= 100) level = 'info';
    if (statusCode >= 400) level = 'warn';
    if (statusCode >= 500) level = 'error';
    return level;
  }
});

exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
