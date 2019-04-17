exports.up = knex => knex.schema
  .createTable('users', table => {
    table.increments();
    table.string('email', 255).notNullable().unique();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).defaultTo('student');
    table.timestamps(true, true);
  })
  .createTable('tickets', table => {
    table.increments();
    // predefined set of options: inQueue/opened/resolved
    table.string('status', 128).defaultTo('inQueue');
    table.string('title', 256).notNullable();
    table.text('description').notNullable();
    // what the student tried to fix this issue
    table.text('tried');
    // student who created the ticket
    table.integer('student_id').unsigned().notNullable();
    table.foreign('student_id').references('users.id');
    // do we want user or admin deletion to delete the created ticket?
    // if not assigned = the ticket is still in the queue
    table.integer('helper_id').unsigned();
    table.foreign('helper_id').references('users.id');
    table.timestamps(true, true);
  })
  .createTable('categories', table => {
    table.increments();
    table.string('name', 128).notNullable().unique();
  })
  .createTable('categorized_tickets', table => {
    table.increments();
    table.integer('ticket_id').unsigned().notNullable();
    table.foreign('ticket_id').references('tickets.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('categories.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('roles', table => {
    table.increments();
    table.string('name', 128).notNullable().unique();
  });

exports.down = knex => knex.schema
  .dropTableIfExists('roles')
  .dropTableIfExists('categorized_tickets')
  .dropTableIfExists('categories')
  .dropTableIfExists('tickets')
  .dropTableIfExists('users');
