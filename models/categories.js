const Joi = require('joi');
const db = require('../data/db');

const validCategories = async () => {
  const categories = await db('categories');
  return categories.map(cat => cat.id);
};

module.exports = {
  add: cat => db('categories').insert(cat).returning('id'),
  get: async (id, ticket) => {
    let query = db('categories as c');

    if (id) query = !ticket
      ? query.where({ id })
      : query.join('categorized_tickets as ct', 'c.id', 'ct.category_id')
        .join('tickets as t', 't.id', 'ct.ticket_id')
        .where('t.id', id)
        .select('c.id', 'c.name');

    return query;
  },
  getByName: name => db('categories').where({ name }).first(),
  filter: query => db('categories').where(query),
  update: (id, changes) => db('categories').where({ id }).update(changes),
  remove: id => db('categories').where({ id }).del(),
  clear: () => db('categories').truncate(),
  schema: (cat, post) => {
    let schema = {
      name: Joi.string().max(128).required()
    };

    // must be a valid category id for editing since name will be different
    if (!post) schema = Object.assign(schema, {
      id: Joi.string().required().valid(validCategories()),
    });

    return Joi.validate(cat, schema);
  }
};
