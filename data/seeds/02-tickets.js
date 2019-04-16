exports.seed = function(knex) {
  return knex('tickets').insert([
    {
      status: 'resolved',
      title: 'problem1',
      description: 'big problem',
      tried: 'cry',
      student_id: 2,
      admin_id: 1
    },
    {
      status: 'open',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 4,
      admin_id: 1
    },
    {
      title: 'problem3',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      admin_id: null
    },
    {
      title: 'problem4',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      admin_id: null
    }
  ]);
};
