const express = require('express');
const DB = require('../../data/models/ticketsModel');

const router = express.Router();

/**
 * @todo - protected routes
 * @todo - add admin_id on [PUT] request to assign ticket
 */

/**
 * [GET] /api/tickets
 * @returns  an array of ticket objects or error
 */
router.get('/', async (req, res) => {
  try {
    const getAllResources = await DB.getTicketsWithCats();
    res.status(200).json(getAllResources);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */
router.post('/', async (req, res) => {
  let { title, description, student_id, tried } = req.body;
  student_id = Number(student_id);

  if (title && description && student_id) {
    // asign default status to new ticket
    const status = 'inQueue';
    // call DB query
    const createNewResource = await DB.postNewTicket({
      title,
      description,
      tried,
      student_id,
      status,
    });
    res.status(201).json(createNewResource);
  } else {
    res.status(400).json({
      message:
        'Please provide Title, Description and Student ID for new Ticket',
    });
  }
});

module.exports = router;
