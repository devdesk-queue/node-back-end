const bcrypt = require('bcryptjs');

exports.seed = knex =>
  knex('users').insert([
    {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      username: process.env.ADMIN_USERNAME || 'admin',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'supersecretpw', 10),
      role: 'admin'
    },
    {
      email: 'pavol@example.com',
      username: 'pav0l',
      password: bcrypt.hashSync('yeeyee', 10),
      role: 'student'
    },
    {
      email: 'macjabeth@example.com',
      username: 'macjabeth',
      password: bcrypt.hashSync('woopwoop', 10),
      role: 'helper'
    },
    {
      email: 'omar@kittycuddlers.net',
      username: 'kittycuddler',
      password: bcrypt.hashSync('purrrr', 10),
      role: 'student'
    }
  ]);
