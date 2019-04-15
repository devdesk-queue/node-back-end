const validate = require('../middleware/validate');
const Tickets = require('../models/ticketsModel');
const router = require('express').Router();
// adding note to make changes

/**
 * @todo - protected routes
 * @todo - on [PUT] request, query USERS database if this user_id is admin
 */

/**
 * [GET] /api/tickets
 * @returns  an array of ticket objects or error
 */
router.get('/', async (req, res) => {
  const getAllResources = await Tickets.getTicketsWithCats();
  res.status(200).json(getAllResources);
});

/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */
router.post('/', validate(Tickets.schema), async (req, res) => {
  let newTicket = req.body;

  const [ticketID] = await Tickets.postNewTicket(newTicket);

  const ticket = await Tickets.getTicketById(ticketID);

  res.status(201).json(ticket);
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

router.put('/:id', validate(Tickets.schema), async (req, res) => {
  const id = req.params.id;
  // user_id should be admin!
  const { status, user_id } = req.body;
  const validValues = ['inQueue', 'opened', 'resolved'];

  // check if the user, who made the request is an admin
  // query USERS database if this user_id is admin
  // if not, response with an error

  // check if the status has only valid values
  if (validValues.includes(status)) {
    const getSpecificTicket = await Tickets.getTicketById(id);
    // check if ticket with defined ID exist
    if (getSpecificTicket) {
      // update ticket status and assign admin, who made the change
      const editTicket = await Tickets.updateTicket({
        status,
        admin_id: user_id,
        ticket_id: id
      });
      res.status(200).json(editTicket);
    } else {
      res.status(404).json({ message: `Ticket with ID ${id} does not exist.` });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please provide proper status for the ticket' });
  }
});

module.exports = router;
