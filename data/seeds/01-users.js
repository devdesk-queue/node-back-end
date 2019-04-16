const bcrypt = require('bcryptjs');

exports.seed = knex =>
  knex('users').insert([
    {
      email: 'devdeskapp@gmail.com',
      username: 'admin',
      password: bcrypt.hashSync('super22unicorndragon@55', 10),
      admin: true
    },
    {
      email: 'pavos@example.com',
      username: 'pav0s',
      password: bcrypt.hashSync('yeeyee', 10)
    },
    {
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: bcrypt.hashSync('supersecurepasswd', 10)
    },
    {
      email: 'omar@kittycuddlers.net',
      username: 'kittycuddler',
      password: bcrypt.hashSync('purrrr', 10)
    }
  ]);
