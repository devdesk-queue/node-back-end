exports.seed = function (knex) {
  return knex('tickets').insert([
    {
      status: 'resolved',
      title: 'problem1',
      description: 'big problem',
      tried: 'cry',
      student_id: 2,
      helper_id: 1
    },
    {
      status: 'open',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 4,
      helper_id: 1
    },
    {
      status: 'inQueue',
      title: 'problem3',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      helper_id: null
    },
    {
      status: 'inQueue',
      title: 'problem4',
      description: 'big problem',
      tried: 'cry',
      student_id: 3,
      helper_id: null
    }
  ]);
};
