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
 * Slack bot [POST] requests
 */


const signature = require('../slack_bot/verifySignature');
const ticket = require('../slack_bot/ticket');

const axios = require('axios');
const bodyParser = require('body-parser');
const qs = require('querystring');
const debug = require('debug')('slash-command-template:index');

const apiUrl = 'https://slack.com/api';

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

router.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
router.use(bodyParser.json({ verify: rawBodyBuffer }));

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
router.post('/command', (req, res) => {
  // extract the slash command text, and trigger ID from payload
  const { text, trigger_id } = req.body;

  // Verify the signing secret
  if (signature.isVerified(req)) {
    // create the dialog payload - includes the dialog structure, Slack API token,
    // and trigger ID
    const dialog = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id,
      dialog: JSON.stringify({
        title: 'Submit a DevDesk ticket to the queue',
        callback_id: 'submit-ticket',
        submit_label: 'Submit',
        elements: [
          {
            label: 'Title',
            type: 'text',
            name: 'title',
            value: text,
            hint: '30 second summary of the problem',
          },
          {
            label: 'Description',
            type: 'textarea',
            name: 'description',
            optional: true,
          },
          {
            label: 'What I\'ve tried',
            type: 'textarea',
            name: 'tried',
            optional: true,
          },
          {
            label: 'Category',
            type: 'select',
            name: 'category',
            options: [
              { label: 'JavaScript I', value: 'JavaScript I' },
              { label: 'JavaScript II', value: 'JavaScript II' },
              { label: 'JavaScript III', value: 'JavaScript III' },
            ],
          },
        ],
      }),
    };

    // open the dialog by calling dialogs.open method and sending the payload
    axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialog))
      .then((result) => {
        debug('dialog.open: %o', result.data);
        res.send('axios.post was success!');
      }).catch((err) => {
        debug('dialog.open call failed: %o', err);
        res.sendStatus(500);
      });
  } else {
    debug('Verification token mismatch');
    res.sendStatus(404);
  }
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
router.post('/interactive', (req, res) => {
  const body = JSON.parse(req.body.payload);

  // check that the verification token matches expected value
  if (signature.isVerified(req)) {
    debug(`Form submission received: ${body.submission.trigger_id}`);

    // immediately respond with a empty 200 response to let
    // Slack know the command was received
    res.send('');

    // create Helpdesk ticket
    ticket.create(body.user.id, body.submission);
  } else {
    debug('Token mismatch');
    res.sendStatus(404);
  }
});


module.exports = router;
