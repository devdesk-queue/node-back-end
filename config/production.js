module.exports = {
  knex: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './data/devdesk.sqlite3' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};
