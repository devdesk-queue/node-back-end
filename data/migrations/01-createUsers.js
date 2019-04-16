exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments();
    table.string('email', 255).notNullable().unique();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.boolean('admin').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('users');
