const Joi = require('joi');
const categoriesDB = require('./categories');
const db = require('../data/db');

module.exports = {
  add: ticket => db('tickets').insert(ticket).returning('id'),
  get: async id => {
    let query = db('tickets');
    if (id) query = query.where({ id });

    const tickets = await query;

    for (const ticket of tickets) {
      ticket.categories = await categoriesDB.get(ticket.id, true);
    }

    return tickets;
  },
  filter: query => db('tickets').where(query),
  update: (id, changes) =>
    db('tickets')
      .where({ id })
      .update(changes),
  remove: id =>
    db('tickets')
      .where({ id })
      .del(),
  clear: () => db('tickets').truncate(),
  schema: (ticket, post) => {
    let schema = {
      status: Joi.string().valid('inQueue', 'opened', 'resolved'),
      helper_id: Joi.number().integer().positive()
    };

    if (post) schema = Object.assign(schema, {
      title: Joi.string().max(256).required(),
      description: Joi.string().required(),
      tried: Joi.string(),
      student_id: Joi.number().integer().positive(),
      category: Joi.string().required()
    });

    return Joi.validate(ticket, schema);
  }
};
