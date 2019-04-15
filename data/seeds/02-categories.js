exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { category_id: 1, category: 'React' },
        { category_id: 2, category: 'Administration' },
        { category_id: 3, category: 'ISA' },
        { category_id: 4, category: 'Other' },
      ]);
    });
};
