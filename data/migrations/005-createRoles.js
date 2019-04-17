exports.up = knex =>
  knex.schema.createTable('roles', table => {
    table.increments();
    table.string('name', 128).notNullable().unique();
  });

exports.down = knex => knex.schema.dropTableIfExists('roles');
