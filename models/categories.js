const Joi = require('joi');
const db = require('../data/db');

const validCategories = async () => {
  const categories = await db('categories');
  return categories.map(cat => cat.id.toString());
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
  schema: async (cat, post) => {
    let schema = post
      ? { name: Joi.string().max(128).required() }
      : {
        id: Joi.string().required().valid(await validCategories()),
        name: Joi.string().max(128).required()
      };
    return Joi.validate(cat, schema).catch(err => console.error(err));

  }
};
