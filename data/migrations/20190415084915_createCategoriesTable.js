exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', table => {
    table.increments('category_id');

    table.string('category', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
