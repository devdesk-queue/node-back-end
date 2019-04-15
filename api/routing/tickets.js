const express = require('express');
const DB = require('../../data/models/ticketsModel');

const router = express.Router();

/**
 * @todo - protected routes
 */

router.get('/', async (req, res) => {
  try {
    const getAllResources = await DB.getTicketsWithCats();
    res.status(200).json(getAllResources);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
