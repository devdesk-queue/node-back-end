const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const users = require('./users');

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = (ticket) => {
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: process.env.SLACK_ACCESS_TOKEN,
    channel: ticket.userId,
    as_user: true,
    text: 'Helpdesk ticket created!',
    attachments: JSON.stringify([
      {
        title: `Ticket created for ${ticket.userEmail}`,
        // Get this from the 3rd party helpdesk system
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

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = (userId, submission) => {
  const ticket = {};

  const fetchUserEmail = new Promise((resolve, reject) => {
    users.find(userId).then((result) => {
      debug(`Find user: ${userId}`);
      resolve(result.data.user.profile.email);
    }).catch((err) => { reject(err); });
  });

  fetchUserEmail.then((result) => {
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

module.exports = { create, sendConfirmation };