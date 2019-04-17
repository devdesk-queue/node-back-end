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
      status: 'open',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 4
    },
    {
      status: 'inQueue',
      title: 'problem3',
      description: 'big problem',
      tried: 'cry',
      student_id: 3
    },
    {
      status: 'inQueue',
      title: 'problem4',
      description: 'big problem',
      tried: 'cry',
      student_id: 3
    }
  ]);
