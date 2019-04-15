const express = require('express');
const DB = require('../../data/models/ticketsModel');
// adding note to make changes
const router = express.Router();

/**
 * @todo - protected routes
 * @todo - on [PUT] request, query USERS database if this user_id is admin
 */

/**
 * [GET] /api/tickets
 * @returns  an array of ticket objects or error
 */
router.get('/', async (req, res, next) => {
  try {
    const getAllResources = await DB.getTicketsWithCats();
    res.status(200).json(getAllResources);
  } catch (error) {
    next(error);
  }
});

/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */
router.post('/', async (req, res, next) => {
  let { title, description, student_id, tried } = req.body;
  student_id = Number(student_id);

  if (title && description && student_id) {
    try {
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
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({
      message: 'Please provide title, description and user_id for new Ticket',
    });
  }
});

/**
 * [PUT] ticket
 * @payload - an object with `status` property
 * @returns -
 */

/*
As a helper I want to be able to assign a ticket to myself by clicking
  a ""help student"" button.
As a helper I want to be able to mark the ticket as ""resolved""
  As a helper I want to be able to re-assign the ticket back to the
queue if I cannot resolve the ticket.
*/

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  // user_id should be admin!
  const { status, user_id } = req.body;
  const validValues = ['inQueue', 'opened', 'resolved'];

  // check if the user, who made the request is an admin
  try {
    // query USERS database if this user_id is admin
    // if not, response with an error
  } catch (error) {
    next(error);
  }

  // check if the status exists and has only valid values
  if (status && validValues.includes(status)) {
    try {
      const getSpecificTicket = await DB.getTicketById(id);
      // check if ticket with defined ID exist
      if (getSpecificTicket) {
        // update ticket status and assign admin, who made the change
        const editTicket = await DB.updateTicket({
          status,
          admin_id: user_id,
          ticket_id: id,
        });
        res.status(200).json(editTicket);
      } else {
        res
          .status(404)
          .json({ message: `Ticket with ID ${id} does not exist.` });
      }
    } catch (error) {
      next(error);
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please provide proper status for the ticket' });
  }
});

module.exports = router;
