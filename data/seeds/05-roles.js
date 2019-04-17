exports.seed = function(knex) {
  return knex('roles').insert([
    { name: 'student' },
    { name: 'helper' },
    { name: 'admin' }
  ]);
};
