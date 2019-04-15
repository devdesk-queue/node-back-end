exports.seed = function(knex) {
  return knex('categories').insert([
    { category_id: 1, category: 'React' },
    { category_id: 2, category: 'Administration' },
    { category_id: 3, category: 'ISA' },
    { category_id: 4, category: 'Other' }
  ]);
};
