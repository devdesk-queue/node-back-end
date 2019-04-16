const server = require('../api/server');
const request = require('supertest');
const Tickets = require('../models/tickets');


describe('Tickets route', () => {
  beforeAll(async () => {
    await Tickets.add({
      'title': 'Please help',
      'description': 'I need help',
      'tried': 'I tried this....',
      'student_id': 2,
    });

    await Tickets.add({
      'title': 'Please help again',
      'description': 'I need help again',
      'tried': 'I tried everything',
      'student_id': 2,
    });
  });

  afterAll(async () => {
    await Tickets.clear();
  });

  it('is in the right environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('GET all tickets. /api/tickets', () => {
    it('responds with Status Code 200 on success', () => {
      return request(server).get('/api/tickets').expect(200);
    });

    it('returns Tickets', async () => {
      const tickets = await request(server).get('/api/tickets');
      expect(tickets.body).toHaveLength(2);
    });

    it('has a JSON content type header', () => {
      return request(server)
        .get('/api/tickets')
        .expect('Content-Type', /json/i);
    });

    it('returns an array', async () => {
      const tickets = await request(server).get('/api/tickets');
      expect(Array.isArray(tickets.body)).toBeTruthy();
    });
  });

  describe('GET ticket by id. /api/tickets/:id', () => {
    it('responds with Status Code 200 on success', () => {
      return request(server).get('/api/tickets/1').expect(200);
    });

    it('responds with Status Code 404 if the ticket does not exist', () => {
      return request(server).get('/api/tickets/0').expect(404);
    });

    it('returns single ticket object', async () => {
      const ticket = await request(server).get('/api/tickets/1');
      expect(ticket.body).toHaveProperty('id', 1);
    });
  });

  describe('POST new ticket. /api/tickets', () => {
    it('responds with Status Code 422 on failed payload validation', () => {
      return request(server)
        .post('/api/tickets')
        .send({ title: 'Unfinished ticket' })
        .expect(422);
    });

    it('responds with Status Code 201 on success', () => {
      return request(server)
        .post('/api/tickets')
        .send({
          'title': 'Unfinished ticket',
          'description': 'I need help',
          'tried': 'I tried this....',
          'student_id': 3,
        })
        .expect(201);
    });

    it('adds new ticket', async () => {
      await request(server)
        .post('/api/tickets')
        .send({
          'title': 'Unfinished ticket',
          'description': 'I need help',
          'tried': 'I tried this....',
          'student_id': 3,
        });
      const tickets = await Tickets.get();
      expect(tickets).toHaveLength(4);
    });

    it('returns new ticket', async () => {
      const ticket = await request(server)
        .post('/api/tickets')
        .send({
          'title': 'Awesome ticket',
          'description': 'I need help',
          'tried': 'I tried this....',
          'student_id': 3,
        });
      expect(ticket.body.title).toBe('Awesome ticket');
    });
  });
});
