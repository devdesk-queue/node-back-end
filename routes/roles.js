const router = require('express').Router();
const Roles = require('../models/roles');
const restricted = require('../middleware/restricted');
const authorise = require('../middleware/authorise');

/**
 * [GET] /api/roles
 * @returns an array of roles objects
*/
router.get(
  '/',
  restricted,
  authorise,
  async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const roles = await Roles.get();
    res.status(200).json(roles);
  }
);

module.exports = router;
