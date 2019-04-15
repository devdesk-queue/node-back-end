module.exports = {
  knex: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './data/devdesk.sqlite3' }
  }
};
