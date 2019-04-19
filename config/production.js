const productionDBConnection = process.env.DATABASE_URL || {
  host: 'localhost',
  database: 'devdesk',
  user: 'devdeskapp@gmail.com',
  password: 'super22unicorndragon@55'
};

module.exports = {
  knex: {
    client: 'pg',
    connection: productionDBConnection
  }
};