module.exports = {
  knex: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './data/test_devdesk.sqlite3' }
  }
};
