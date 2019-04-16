// adding note to make changes

exports.up = knex =>
  knex.schema.createTable('categorized_tickets', table => {
    table.increments();

    table.integer('ticket_id')
      .notNullable()
      .references('tickets.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('category_id')
      .notNullable()
      .references('categories.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('categorized_tickets');
