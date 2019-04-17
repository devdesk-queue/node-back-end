exports.up = knex =>
  knex.schema.createTable('tickets', table => {
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
    table.integer('admin_id').unsigned();
    table.foreign('admin_id').references('users.id');

    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists('tickets');
