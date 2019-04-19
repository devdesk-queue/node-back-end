exports.seed = knex =>
  knex('tickets').insert([
    {
      status: 'resolved',
      title: 'problem1',
      description: 'big problem',
      tried: 'cry',
      student_id: 2
    },
    {
      status: 'helping',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 4,
      helper_id: 3
    },
    {
      status: 'pending',
      title: 'problem3',
      description: 'big problem',
      tried: 'cry',
      student_id: 3
    },
    {
      status: 'pending',
      title: 'problem4',
      description: 'big problem',
      tried: 'cry',
      student_id: 3
    }
  ]);
