
// adding note to make changes
exports.up = function (knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('category_id');

    table.string('category', 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
