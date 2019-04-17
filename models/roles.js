const Joi = require('joi');
const db = require('../data/db');

module.exports = {
  add: role => db('roles').insert(role),
  get: async (id) => {
    let query = db('roles');
    if (id) query = query.where({ id });
    return query;
  },
  filter: query => db('roles').where(query),
  update: (id, changes) => db('roles').where({ id }).update(changes),
  remove: id => db('roles').where({ id }).del(),
  clear: () => db('roles').truncate(),
  schema: role => {
    const schema = Joi.object().keys({
      name: Joi.string().max(50).required()
    });
    return Joi.validate(role, schema);
  }
};
