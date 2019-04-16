const Joi = require('joi');
const categoriesDB = require('./categories');
const db = require('../data/db');

module.exports = {
  add: cat => db('tickets').insert(cat),
  get: async (id) => {
    let query = db('tickets'); if (id) query = query.where({ id });

    const tickets = await query;

    for (const ticket of tickets) {
      ticket.categories = await categoriesDB.get(ticket.id, true);
    }

    return tickets;
  },
  filter: query => db('tickets').where(query),
  update: (id, changes) => db('tickets').where({ id }).update(changes),
  remove: id => db('tickets').where({ id }).del(),
  clear: () => db('tickets').truncate(),
  schema: cat => {
    const schema = Joi.object().keys({
      status: Joi.string().valid('inQueue', 'opened', 'resolved'),
      title: Joi.string().max(256).required(),
      description: Joi.string().required(),
      tried: Joi.string(),
      student_id: Joi.number().integer().positive(),
      admin_id: Joi.number().integer().positive(),
      category: Joi.string().required()
    });
    return Joi.validate(cat, schema);
  }
};
