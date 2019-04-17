exports.up = knex =>
  knex.schema.createTable('categorized_tickets', table => {
    table.increments();

    table.integer('ticket_id').unsigned().notNullable();
    table.foreign('ticket_id').references('tickets.id')
      .onDelete('CASCADE').onUpdate('CASCADE');

    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('categories.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('categorized_tickets');
