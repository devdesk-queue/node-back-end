module.exports = {
  knex: {
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    pool: {
      afterCreate: (conn, done) => {
        // I believe this is necessary for cascading
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};
