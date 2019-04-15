exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', table => {
    table.increments('ticket_id');

    // predefined set of options: inQueue/opened/resolved
    table.string('status', 128);

    table.string('title', 256).notNullable();

    table.text('description').notNullable();

    // what the student tried to fix this issue
    table.text('tried');

    // student who created the ticket
    table
      .integer('student_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // if not assigned = the ticket is still in the queue
    table
      .integer('admin_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tickets');
};
