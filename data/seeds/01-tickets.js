exports.seed = function(knex) {
  return knex('tickets').insert([
    {
      ticket_id: 1,
      status: 'resolved',
      title: 'problem1',
      description: 'big problem',
      tried: 'cry',
      student_id: 2,
      admin_id: 1
    },
    {
      ticket_id: 2,
      status: 'open',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 4,
      admin_id: 1
    },
    {
      ticket_id: 3,
      status: 'inQue',
      title: 'problem3',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      admin_id: null
    },
    {
      ticket_id: 4,
      status: 'inQue',
      title: 'problem4',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      admin_id: null
    }
  ]);
};
