const Joi = require('joi');
const db = require('../data/db');

module.exports = {
  add: user => db('users').insert(user).returning('id'),
  get: async id => {
    let query = db('users');

    if (id) query = query.where({ id });

    // select everything but the password
    query = query.select(
      'id',
      'email',
      'username',
      'role',
      'created_at',
      'updated_at'
    );

    return query;
  },
  filter: query => db('users').where(query),
  update: (id, changes) => db('users').where({ id }).update(changes),
  remove: id => db('users').where({ id }).del(),
  clear: () => db('users').truncate(),
  schema: user => {
    const schema = Joi.object().keys({
      currentPassword: Joi.string().max(255).required(),
      newPassword: Joi.string().max(255),
      email: Joi.string().email().max(255),
      username: Joi.string().max(255),
      role: Joi.string().max(50)
    });

    return Joi.validate(user, schema);
  }
};
