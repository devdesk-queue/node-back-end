const express = require('express');

function serverError(error, req, res, next) {
  res
    .status(500)
    .json({ message: 'Something is wrong with the server.', error });
  next();
}

module.exports = {
  serverError,
};
