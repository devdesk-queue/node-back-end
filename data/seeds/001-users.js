const bcrypt = require('bcryptjs');

exports.seed = knex =>
  knex('users').insert([
    {
      email: process.env.ADMIN_EMAIL,
      username: process.env.ADMIN_USERNAME,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      role: 'admin'
    },
    {
      email: 'pavol@example.com',
      username: 'pav0l',
      password: bcrypt.hashSync('yeeyee', 10),
      role: 'student'
    },
    {
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: bcrypt.hashSync('supersecurepasswd', 10),
      role: 'student'
    },
    {
      email: 'omar@kittycuddlers.net',
      username: 'kittycuddler',
      password: bcrypt.hashSync('purrrr', 10),
      role: 'student'
    }
  ]);
