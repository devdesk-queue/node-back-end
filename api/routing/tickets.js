const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).json('/api/tickets route is live');
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
