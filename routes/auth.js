const Joi = require('joi');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const validate = require('../middleware/validate');
const generateToken = require('../middleware/token');

const schema = (creds, register) => {
  let schema = {
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
  };

  if (register) schema = Object.assign(schema, {
    email: Joi.string().email().max(255).required()
  });

  return Joi.validate(creds, schema);
};

router.post(
  '/register',
  validate(schema, true),
  async ({ body: newUser }, res) => {
    let [existingUser] = await Users.filter({ username: newUser.username });
    if (existingUser) return res.status(405).json({
      message: 'That username has already been taken.'
    });

    [existingUser] = await Users.filter({ email: newUser.email });
    if (existingUser) return res.status(405).json({
      message: 'There is an account with that email already.'
    });

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const [id] = await Users.add(newUser);
    // eslint-disable-next-line no-unused-vars
    const [{ password, ...user }] = await Users.get(id);
    const token = generateToken(user);

    res.status(201).json({ user, token });
  }
);

router.post('/login', validate(schema), async ({ body: creds }, res) => {
  const { username, password } = creds;

  const [user] = await Users.filter({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({
      message: `Welcome, ${username}!`,
      token,
      id: user.id,
    });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

module.exports = router;
