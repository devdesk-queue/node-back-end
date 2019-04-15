exports.seed = function(knex) {
  return knex('categorized_tickets').insert([
    { cat_tic_id: 1, ticket_id: 1, category_id: 2 },
    { cat_tic_id: 2, ticket_id: 1, category_id: 3 },
    { cat_tic_id: 3, ticket_id: 2, category_id: 1 },
    { cat_tic_id: 4, ticket_id: 3, category_id: 2 },
    { cat_tic_id: 5, ticket_id: 3, category_id: 4 },
    { cat_tic_id: 6, ticket_id: 4, category_id: 4 }
  ]);
};
