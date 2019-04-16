const Joi = require('joi');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDB = require('../models/users');
const validate = require('../middleware/validate');
const generateToken = require('../middleware/token');

const schema = (creds, register) => {
  const schema = Joi.object().keys({
    email: register ? Joi.string().email().max(255).required() : null,
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
  });
  return Joi.validate(creds, schema);
};

router.post('/register', validate(schema, true), async ({ body: newUser }, res) => {
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  const [id] = await userDB.add(newUser);
  // eslint-disable-next-line no-unused-vars
  const [{password, ...user}] = await userDB.get(id);
  user.admin = Boolean(user.admin);
  res.status(201).json(user);
});

router.post('/login', validate(schema), async ({ body: creds }, res) => {
  const { username, password } = creds;

  const [user] = await userDB.filter({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({
      message: `Welcome, ${username}!`,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

module.exports = router;
