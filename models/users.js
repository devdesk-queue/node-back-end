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
  schema: (user, post) => {
    const schema = post
      ? Joi.object().keys({
          email: Joi.string().email().max(255),
          password: Joi.string().max(255)
        })
      : Joi.object().keys({
          email: Joi.string().email().max(255).required(),
          username: Joi.string().max(255).required(),
          password: Joi.string().max(255).required()
        });

    return Joi.validate(user, schema);
  }
};
