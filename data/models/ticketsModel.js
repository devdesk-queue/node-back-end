const db = require('../knexConfig');

module.exports = {
  getTicketsWithCats,
  getAllTickets,
  getTicketCatRelationships,
  getAllCategories,
};

async function getTicketsWithCats() {
  const allTickets = await getAllTickets();
  const relTable = await getTicketCatRelationships();
  const categories = await getAllCategories();

  allTickets.map(ticket => {
    ticket.categories = relTable
      .filter(row => row.ticket_id === ticket.ticket_id)
      .map(item => {
        const catName = categories.find(a => {
          return a.category_id == item.category_id;
        });
        item = catName.category;
        return item;
      });
  });

  return allTickets;
}

function getAllTickets() {
  return db('tickets');
}

function getTicketCatRelationships() {
  return db('categorized_tickets');
}

function getAllCategories() {
  return db('categories');
}
