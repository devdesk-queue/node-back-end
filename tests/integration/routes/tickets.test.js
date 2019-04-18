const bcrypt = require('bcryptjs');
const request = require('supertest');
const server = require('../../../api/server');
const Users = require('../../../models/users');
const Tickets = require('../../../models/tickets');
const Categories = require('../../../models/categories');

describe('/api/tickets', () => {
  let token;

  beforeAll(async () => {
    await Users.clear();
    await Tickets.clear();
    await Categories.clear();

    await Users.add({
      email: 'devdeskapp@gmail.com',
      username: 'admin',
      password: bcrypt.hashSync('super22unicorndragon@55', 10),
      role: 'admin'
    });

    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'super22unicorndragon@55' });

    token = res.body.token;

    await Users.add({
      email: 'pavos@example.com',
      username: 'pav0s',
      password: bcrypt.hashSync('yeeyee', 10)
    });

    await Users.add({
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: bcrypt.hashSync('supersecurepasswd', 10)
    });

    await Tickets.add({
      status: 'inQueue',
      title: 'First ticket',
      description: 'I need help',
      tried: 'I tried this....',
      student_id: 2
    });

    await Tickets.add({
      status: 'inQueue',
      title: 'Second ticket',
      description: 'I need help',
      tried: 'I tried this....',
      student_id: 2
    });

    await Categories.add({
      name: 'JavaScript IV'
    });
  });

  afterAll(async () => {
    await Users.clear();
    await Tickets.clear();
    await Categories.clear();
  });

  it('is in the right environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('responds with status code 200 on success', async () => {
      const res = await request(server).get('/api/tickets');
      expect(res.status).toBe(200);
    });

    it('returns tickets', async () => {
      const tickets = await request(server).get('/api/tickets');
      expect(tickets.body).toHaveLength(2);
    });

    it('has a json content type header', async () => {
      await request(server).get('/api/tickets').expect('Content-Type', /json/);
    });

    it('returns an array', async () => {
      const tickets = await request(server).get('/api/tickets');
      expect(Array.isArray(tickets.body)).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('responds with status code 200 on success', async () => {
      const res = await request(server).get('/api/tickets/1');
      expect(res.status).toBe(200);
    });

    it('responds with status code 404 if the ticket does not exist', async () => {
      const res = await request(server).get('/api/tickets/0');
      expect(res.status).toBe(404);
    });

    it('returns single ticket object', async () => {
      const ticket = await request(server).get('/api/tickets/1');
      expect(ticket.body).toHaveProperty('id', 1);
    });
  });

  describe('POST /', () => {
    it('responds with status code 401 on unauthenticated user payload', async () => {
      const res = await request(server)
        .post('/api/tickets')
        .send({ title: 'Unauthenticated ticket' });
      expect(res.status).toBe(401);
    });

    it('responds with status code 422 on failed payload validation', async () => {
      const res = await request(server)
        .post('/api/tickets')
        .set('authorization', token)
        .send({ title: 'Unfinished ticket' });
      expect(res.status).toBe(422);
    });

    it('responds with status code 201 on success', async () => {
      const res = await request(server)
        .post('/api/tickets')
        .set('authorization', token)
        .send({
          status: 'opened',
          title: 'Third ticket',
          description: 'I need help',
          tried: 'I tried this....',
          category: 'JavaScript IV'
        });
      expect(res.status).toBe(201);
    });

    it('adds new ticket', async () => {
      await request(server)
        .post('/api/tickets')
        .set('authorization', token)
        .send({
          status: 'opened',
          title: 'Fourth ticket',
          description: 'I need help',
          tried: 'I tried this....',
          category: 'JavaScript IV'
        });
      const tickets = await Tickets.get();
      expect(tickets).toHaveLength(4);
    });

    it('returns new ticket', async () => {
      const ticket = await request(server)
        .post('/api/tickets')
        .set('authorization', token)
        .send({
          status: 'opened',
          title: 'Fifth ticket',
          description: 'I need help',
          tried: 'I tried this....',
          category: 'JavaScript IV'
        });
      expect(ticket.body).toHaveProperty('title', 'Fifth ticket');
    });
  });

  describe('PUT /:id', () => {
    it('responds with status code 401 on authenticated payload', async () => {
      const res = await request(server)
        .put('/api/tickets/1')
        .send({ status: 'resolved', helper_id: 1 });
      expect(res.status).toBe(401);
    });

    it('responds with status code 200 on success', async () => {
      const res = await request(server)
        .put('/api/tickets/1')
        .set('authorization', token)
        .send({ status: 'resolved', helper_id: 1 });
      expect(res.status).toBe(200);
    });

    it('responds with status code 404 if the ticket does not exist', async () => {
      const res = await request(server)
        .put('/api/tickets/0')
        .set('authorization', token)
        .send({ status: 'opened', helper_id: 1 });
      expect(res.status).toBe(404);
    });

    it('returns single ticket object', async () => {
      const ticket = await request(server)
        .put('/api/tickets/1')
        .set('authorization', token)
        .send({ status: 'resolved', helper_id: 1 });
      expect(ticket.body).toHaveProperty('status', 'resolved');
    });
  });
});
