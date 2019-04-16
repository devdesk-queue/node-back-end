module.exports = {
  secrets: { jwt: 'supersecretkey' },
  knex: {
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  }
};
