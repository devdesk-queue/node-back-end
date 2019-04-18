const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Roles = require('../models/roles');
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
    // check if user exists
    let [user] = await Users.get(id);
    if (!user) return res.status(404).json({
      message: 'The user does not exist.'
    });

    // check if current passwords match
    if (!bcrypt.compareSync(changes.currentPassword, user.password)) {
      return res.status(400).json({
        message: 'The current password did not match.'
      });
    }

    // update email if provided
    if (changes.email) user.email = changes.email;

    // update username if provided
    if (changes.username) user.username = changes.username;

    // update password if provided
    if (changes.newPassword) {
      user.password = bcrypt.hashSync(changes.newPassword, 10);
    }

    // update role if provided & user is admin
    if (changes.role && user.role === 'admin') {
      // check if role is valid
      const roles = await Roles.get();
      if (roles.find(role => role.name === changes.role)) {
        user.role = changes.role;
      }
    }

    user = await Users.update(id, user);

    // eslint-disable-next-line no-unused-vars
    const [{ password, ...changedUser }] = await Users.get(id);
    res.status(200).json(changedUser);
  }
);

/**
 * [DELETE] /api/users/:id
 * @payload - none
 * @returns - an object with the message status
*/
router.delete(
  '/:id',
  authorise('admin'),
  async ({ params: { id } }, res) => {
    const user = await Users.remove(id);
    if (user) {
      res.status(200).json({ id, message: `User with ID ${id} was deleted.` });
    } else {
      res.status(404).json({ message: 'The user does not exist.' });
    }
  }
);



module.exports = router;
