const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const authorise = require('../middleware/authorise');
const validate = require('../middleware/validate');

/**
 * [GET] /api/users
 * @returns an array of users objects or error
*/
router.get(
  '/',
  authorise('admin'),
  async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const users = await Users.get();
    res.status(200).json(users);
  }
);

/**
 * [GET] by ID /api/users/:id
 * @returns an object with user
*/
router.get(
  '/:id',
  authorise(['admin'], ':id'),
  async ({ params: { id } }, res) => {
    // eslint-disable-next-line no-unused-vars
    const [{ password, ...user }] = await Users.get(id);
    res.status(200).json(user);
  }
);


/**
 * [PUT] /api/users/:id
 * @payload - an object with name of the user
 * @returns - an array with new user
*/
router.put(
  '/:id',
  authorise('admin', ':id'),
  validate(Users.schema, true),
  async ({ params: { id }, body: changes }, res) => {
    if (changes.password) {
      changes.password = bcrypt.hashSync(changes.password, 10);
    }
    const user = await Users.update(id, changes);
    if (user) {
      // eslint-disable-next-line no-unused-vars
      const [{ password, ...changedUser }] = await Users.get(id);
      res.status(200).json(changedUser);
    } else {
      res.status(404).json({ message: 'The user does not exist.' });
    }
  }
);

/**
 * [DELETE] /api/users/:id
 * @payload - none
 * @returns - an array with new user
*/
router.delete(
  '/:id',
  authorise('admin'),
  async ({ params: { id } }, res) => {
    const user = await Users.remove(id);
    if (user) {
      res.status(200).json({ message: 'User was deleted.' });
    } else {
      res.status(404).json({ message: 'The user does not exist.' });
    }
  }
);



module.exports = router;
