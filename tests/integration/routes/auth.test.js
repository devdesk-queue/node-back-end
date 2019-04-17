const request = require('supertest');
const Users = require('../../../models/users');
const server = require('../../../api/server');

describe('/api/auth', () => {
  beforeAll(async () => { await Users.clear(); });
  afterAll(async () => { await Users.clear(); });

  describe('POST /', () => {
    it('should add the user if it is successfully validated', async () => {
      const superChillUser = {
        email: 'test@example.com',
        username: 'mr. kitty',
        password: 'purr'
      };

      const res = await request(server).post('/api/auth/register').send(superChillUser);

      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
    });

    it('should return 422 if auth payload fails validation', async () => {
      const mysteryUser = { username: 'mr. bunny' };
      const res = await request(server).post('/api/auth/register').send(mysteryUser);
      expect(res.status).toBe(422);
    });

    it('should return 405 if username is not unique', async () => {
      const dupedUser = {
        email: 'test2@example.com',
        username: 'mr. kitty',
        password: 'purr'
      };

      const res = await request(server).post('/api/auth/register').send(dupedUser);

      expect(res.status).toBe(405);
    });

    it('should return 405 if email is not unique', async () => {
      const dupedUser = {
        email: 'test@example.com',
        username: 'mr. whiskers',
        password: 'purr'
      };

      const res = await request(server).post('/api/auth/register').send(dupedUser);

      expect(res.status).toBe(405);
    });
  });
});
