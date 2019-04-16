exports.seed = knex =>
  knex('users').insert([
    {
      email: 'devdeskapp@gmail.com',
      username: 'admin',
      password: 'super22unicorndragon@55',
      admin: true
    },
    {
      email: 'pavos@example.com',
      username: 'pav0s',
      password: 'yeeyee'
    },
    {
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: 'supersecurepasswd'
    },
    {
      email: 'omar@kittycuddlers.net',
      username: 'kittycuddler',
      password: 'purrrr'
    }
  ]);
