const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const bcrypt = require('bcryptjs');
const users = require('./users');
const Tickets = require('../models/tickets');
const Categories = require('../models/categories');
const CategorizedTickets = require('../models/categorizedTickets');
const Users = require('../models/users');

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = (ticket) => {
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: process.env.SLACK_ACCESS_TOKEN,
    channel: ticket.userId,
    as_user: true,
    text: 'DevDesk ticket created!',
    attachments: JSON.stringify([
      {
        title: `Ticket created for ${ticket.userEmail}`,
        title_link: 'https://devdeskqueue-slack-bot.herokuapp.com/api/tickets',
        text: ticket.text,
        fields: [
          {
            title: 'Title',
            value: ticket.title,
          },
          {
            title: 'Description',
            value: ticket.description,
          },
          {
            title: 'Status',
            value: 'pending',
            short: true,
          },
          {
            title: 'What I\'ve tried',
            value: ticket.tried,
          },
          {
            title: 'Category',
            value: ticket.category,
          },
        ],
      },
    ]),
  })).then((result) => {
    debug('sendConfirmation: %o', result.data);
  }).catch((err) => {
    debug('sendConfirmation error: %o', err);
    // eslint-disable-next-line no-console
    console.error(err);
  });
};

// Create devdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = (userId, submission) => {
  const ticket = {};

  const fetchUserEmail = new Promise((resolve, reject) => {
    users.find(userId).then((result) => {
      debug(`Find user: ${userId}`);
      resolve(result.data.user.profile.email);
    }).catch((err) => { reject(err); });
  });

  fetchUserEmail.then(result => {
    ticket.userId = userId;
    ticket.userEmail = result;
    ticket.title = submission.title;
    ticket.description = submission.description;
    ticket.tried = submission.tried;
    ticket.category = submission.category;
    sendConfirmation(ticket);

    return ticket;
    // eslint-disable-next-line no-console
  }).catch((err) => { console.error(err); });
};

async function createSlackTicketInDb(userSlackId, newTicket) {
  try {
    // take out category from body into separate variable
    const categoryName = newTicket.category;
    delete newTicket.category;

    const fetchUserEmail = new Promise((resolve, reject) => {
      users.find(userSlackId).then((result) => {
        debug(`Find user: ${userSlackId}`);
        resolve({
          slackUserEmail: result.data.user.profile.email,
          slackUserName: result.data.user.profile.real_name_normalized
        });
      }).catch((err) => { reject(err); });
    });

    // get users email and user name from Slack
    const slackUserInfo = {};
    fetchUserEmail.then(result => {
      slackUserInfo.name = result.slackUserName;
      slackUserInfo.email = result.slackUserEmail;
      // eslint-disable-next-line no-console
    }).catch((err) => { console.error(err); });
    // find matching slack email in our users database
    const [existingUser] = await Users.filter(slackUserInfo.email);

    // if the slack mail is not in our DB, create new user
    if (!existingUser) {
      const [id] = await Users.add({
        password: bcrypt.hashSync(slackUserInfo.name, 10),
        email: slackUserInfo.email,
        username: slackUserInfo.name
      });
      // set student_id to new ticket
      newTicket.student_id = id;
    }

    // check for status, update if missing
    if (!newTicket.status) newTicket.status = 'pending';
    const [ticketID] = await Tickets.add(newTicket);
    const category = await Categories.getByName(categoryName);
    if (category) {
      // create new ticket-category relationship
      await CategorizedTickets.add(ticketID, category.id);
      await Tickets.get(ticketID);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}


module.exports = { create, sendConfirmation, createSlackTicketInDb };