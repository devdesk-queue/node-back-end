exports.seed = function(knex) {
  return knex('categories').insert([
    { name: 'React' },
    { name: 'Administration' },
    { name: 'ISA' },
    { name: 'Other' }
  ]);
};
