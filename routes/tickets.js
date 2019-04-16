const validate = require('../middleware/validate');
const Tickets = require('../models/tickets');
const router = require('express').Router();
// adding note to make changes
/**
 * @todo - protected routes
 * @todo - on [PUT] request, query USERS database if this user_id is admin
 */

/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */

router.post('/', validate(Tickets.schema), async ({ body: newTicket }, res) => {
  const [ticketID] = await Tickets.add(newTicket);
  const [ticket] = await Tickets.fetchById(ticketID);
  res.status(201).json(ticket);
});

/**
 * [GET] /api/tickets
 * @returns an array of ticket objects or error
 */

router.get('/', async (req, res) => {
  const tickets = await Tickets.fetch();
  res.status(200).json(tickets);
});

router.get('/:id', async ({ params: { id } }, res) => {
  const [ticket] = await Tickets.fetchById(id);
  Boolean(ticket)
    ? res.status(200).json(ticket)
    : res.status(404).json({ message: 'The ticket does not exist.' });
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

router.put(
  '/:id',
  validate(Tickets.schema),
  async ({ params: { id }, body: changes }, res) => {
    const count = await Tickets.update(id, changes);
    if (count) {
      const [ticket] = await Tickets.fetchById(id);
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'The ticket does not exist. '});
    }
  }
);

// D

router.put('/:id', validate(Tickets.schema), async (req, res) => {
  const id = req.params.id;
  // user_id should be admin!
  const { status, user_id } = req.body;

  // check if the user, who made the request is an admin
  // query USERS database if this user_id is admin
  // if not, response with an error

  const getSpecificTicket = await Tickets.fetchById(id);
  // check if ticket with defined ID exist
  if (getSpecificTicket) {
    // update ticket status and assign admin, who made the change
    const editTicket = await Tickets.update({
      status,
      admin_id: user_id,
      ticket_id: id
    });
    res.status(200).json(editTicket);
  } else {
    res.status(404).json({ message: `Ticket with ID ${id} does not exist.` });
  }
});

module.exports = router;
