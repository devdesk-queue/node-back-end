const validate = require('../middleware/validate');
const restricted = require('../middleware/restricted');
const authorise = require('../middleware/authorise');
const Tickets = require('../models/tickets');
const Categories = require('../models/categories');
const CategorizedTickets = require('../models/categorizedTickets');
const router = require('express').Router();


/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */
router.post(
  '/',
  restricted,
  validate(Tickets.schema, true),
  async ({ body: newTicket, user }, res) => {
    // take out category from body into separate variable
    const categoryName = newTicket.category;
    delete newTicket.category;
    // set student_id to authenticated user
    newTicket.student_id = user.subject;
    // check for status, update if missing
    if (!newTicket.status) newTicket.status = 'inQueue';
    const [ticketID] = await Tickets.add(newTicket);
    const category = await Categories.getByName(categoryName);
    if (category) {
      // create new ticket-category relationship
      await CategorizedTickets.add(ticketID, category.id);
      const [ticket] = await Tickets.get(ticketID);
      res.status(201).json(ticket);
    } else {
      res.status(404).json({ message: 'This category does not exist' });
    }
  }
);

/**
 * [GET] /api/tickets
 * @returns an array of ticket objects or error
 */
router.get('/', async (req, res) => {
  const tickets = await Tickets.get();
  res.status(200).json(tickets);
});

/**
 * [GET] /api/tickets/:id
 * @returns an object with the ticket props
 */
router.get('/:id', async ({ params: { id } }, res) => {
  const [ticket] = await Tickets.get(id);

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ message: 'The ticket does not exist.' });
  }
});

/**
 * [PUT] ticket
 * @payload - an object with `status` and `helper_id` property
 * @returns - updated ticket object
 */
router.put(
  '/:id',
  authorise(['helper', 'admin'], 'creator'),
  validate(Tickets.schema),
  async ({ params: { id }, body: changes, user }, res) => {
    // check if status if provided, otherwise throw an error
    if (!changes.status) return res.status(422).json({
      message: 'A status must be provided.'
    });

    // set helper_id to current user if none provided
    if (!changes.helper_id) changes.helper_id = user.subject;

    // check if ticket was updated successfully
    const updated = await Tickets.update(id, changes);
    if (!updated) return res.status(404).json({
      message: 'The ticket does not exist.'
    });

    const [ticket] = await Tickets.get(id);
    res.status(200).json(ticket);
  }
);

/**
 * [DELETE] /api/tickets/:id
 * @payload - none
 * @returns - an object with message status
*/
router.delete(
  '/:id',
  authorise('admin'),
  async ({ params: { id } }, res) => {
    const ticket = await Tickets.remove(id);
    if (ticket) {
      res.status(200).json({ message: 'Ticket was deleted.' });
    } else {
      res.status(404).json({ message: 'The ticket does not exist.' });
    }
  }
);

/**
 * [POST] /api/tickets/command
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
 */
router.post(
  '/command',
  async (req, res) => {
    res.end('Slack bot request');
  }
);



module.exports = router;
