// adding note to make changes

exports.up = function (knex) {
  return knex.schema.createTable('categorized_tickets', table => {
    table.increments('cat_tic_id');

    table
      .integer('ticket_id')
      .notNullable()
      .references('ticket_id')
      .inTable('tickets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // should category be mandatory?
    table
      .integer('category_id')
      .notNullable()
      .references('category_id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categorized_tickets');
};
