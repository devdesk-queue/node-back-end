const Joi = require('joi');
const db = require('../data/db');
const validCategories = require('../data/seeds/03-categories');

module.exports = {
  add: cat => db('categories').insert(cat),
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
  schema: cat => {
    const schema = Joi.object().keys({
      name: Joi.string().max(128).required().valid(validCategories)
    });
    return Joi.validate(cat, schema);
  }
};
