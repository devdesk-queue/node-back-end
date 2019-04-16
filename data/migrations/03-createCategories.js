// adding note to make changes

exports.up = knex =>
  knex.schema.createTable('categories', table => {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique();
  });

exports.down = knex => knex.schema.dropTableIfExists('categories');
