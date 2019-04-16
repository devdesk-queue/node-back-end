// adding note to make changes

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
    table.integer('student_id')
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // do we want user or admin deletion to delete the created ticket?

    // if not assigned = the ticket is still in the queue
    table.integer('admin_id')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists('tickets');
