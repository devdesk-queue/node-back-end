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
  async ({ params: { id }, body: changes }, res) => {
    const count = await Tickets.update(id, changes);
    if (count) {
      const [ticket] = await Tickets.get(id);
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'The ticket does not exist.' });
    }
  }
);

module.exports = router;
