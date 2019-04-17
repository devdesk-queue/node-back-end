const Joi = require('joi');
const db = require('../data/db');

module.exports = {
  add: (ticket_id, category_id) => db('categorized_tickets').insert({ ticket_id, category_id }).returning('id'),
  getById: id => db('categorized_tickets').where({ id }).first(),
  filter: query => db('categorized_tickets').where(query),
  update: (id, changes) => db('categorized_tickets').where({ id }).update(changes),
  remove: id => db('categorized_tickets').where({ id }).del(),
  clear: () => db('categorized_tickets').truncate(),
  schema: cat => {
    const schema = Joi.object().keys({
      ticket_id: Joi.number().integer().positive(),
      category_id: Joi.number().integer().positive(),
    });
    return Joi.validate(cat, schema);
  }
};
