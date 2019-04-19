const qs = require('querystring');
const axios = require('axios');

const find = async (slackUserId) => {
  try {
    const body = { token: process.env.SLACK_ACCESS_TOKEN, user: slackUserId };
    const promise = await axios.post('https://slack.com/api/users.info', qs.stringify(body));
    return promise;

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { find };