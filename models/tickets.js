const Joi = require('joi');
const categoriesDB = require('./categories');
const usersDB = require('./users');
const db = require('../data/db');

const validCategories = async () => {
  const categories = await db('categories');
  return categories.map(cat => cat.name);
};

module.exports = {
  add: ticket => db('tickets').insert(ticket).returning('id'),
  get: async id => {
    let query = db('tickets');

    if (id) query = query.where({ id });

    const tickets = await query;

    for (const ticket of tickets) {
      ticket.categories = await categoriesDB.get(ticket.id, true);
      ticket.student = await usersDB.getStudent(ticket.id);
      ticket.helper = await usersDB.getHelper(ticket.id);
    }

    return tickets;
  },
  filter: query => db('tickets').where(query),
  update: (id, changes) => db('tickets').where({ id }).update(changes),
  remove: id => db('tickets').where({ id }).del(),
  clear: () => db('tickets').truncate(),
  schema: async (ticket, post) => {
    let schema = {
      status: Joi.string().valid('pending', 'helping', 'resolved'),
      helper_id: Joi.number().integer().positive()
    };

    if (post) schema = Object.assign(schema, {
      title: Joi.string().max(256).required(),
      description: Joi.string().required(),
      tried: Joi.string(),
      categories: Joi.array().items(Joi.string().valid(await validCategories()))
    });

    return Joi.validate(ticket, schema);
  }
};
