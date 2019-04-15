const Joi = require('joi');
const db = require('../data/db');

// The categories should probably be in a separate model from tickets.

module.exports = {
  getTicketsWithCats,
  getAllTickets,
  getTicketCatRelationships,
  getAllCategories,
  postNewTicket,
  getTicketById,
  updateTicket,
  schema
};

async function getTicketsWithCats() {
  const allTickets = await getAllTickets();
  const relTable = await getTicketCatRelationships();
  const categories = await getAllCategories();

  allTickets.map(ticket => {
    // create new key:value pair for every ticket
    ticket.categories = relTable
      // filter the value based on matching ticket_id
      .filter(row => row.ticket_id === ticket.ticket_id)
      // map over every filtered category object from 'categorized_tickets' table
      .map(item => {
        // find the category from 'categories' table that matches category_id
        const catName = categories.find(a => {
          return a.category_id == item.category_id;
        });
        // replace the item object with category name
        item = catName.category;
        // return only the category name for every ticket
        return item;
      });
  });

  return allTickets;
}

function getAllTickets() {
  return db('tickets');
}

function getTicketById(id) {
  return db('tickets')
    .where('ticket_id', id)
    .first();
}

function getTicketCatRelationships() {
  return db('categorized_tickets');
}

function getAllCategories() {
  return db('categories');
}

function postNewTicket(payload) {
  return db('tickets').insert(payload);
}

function updateTicket(payload) {
  const { status, admin_id, ticket_id } = payload;
  return db('tickets')
    .where({ ticket_id })
    .update({ status, admin_id });
}

function schema(ticket) {
  const schema = Joi.object().keys({
    status: Joi.string().max(128),
    title: Joi.string().max(256).required(),
    description: Joi.string().required(),
    tried: Joi.string(),
    student_id: Joi.number().integer(),
    admin_id: Joi.number().integer()
  });

  return Joi.validate(ticket, schema);
}
