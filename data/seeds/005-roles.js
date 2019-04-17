exports.seed = knex =>
  knex('roles').insert([
    { name: 'student' },
    { name: 'helper' },
    { name: 'admin' }
  ]);
