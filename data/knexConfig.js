const knex = require('knex');
const knexConfig = require('../knexfile');

const dbENV = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbENV]);
