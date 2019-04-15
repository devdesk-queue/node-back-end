const knex = require('knex');
const knexConfig = require('../knexfile');
// adding note to make changes


const dbENV = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbENV]);
