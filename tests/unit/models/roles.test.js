const Roles = require('../../../models/roles');

describe('roles', () => {
  beforeAll(async () => { await Roles.clear(); });
  afterAll(async () => { await Roles.clear(); });

  it('should add new roles', async () => {
    await Roles.add({ name: 'student' });
    await Roles.add({ name: 'helper' });

    const roles = await Roles.get();
    expect(roles).toHaveLength(2);
  });

  it('should find a role', async () => {
    const [role] = await Roles.filter({ name: 'helper' });
    expect(role).toBeDefined();
    expect(role).toHaveProperty('id', 2);
  });

  it('should update a role', async () => {
    const count = await Roles.update(2, { name: 'admin' });
    expect(count).toBe(1);
  });

  it('should delete a role', async () => {
    const count = await Roles.remove(1);
    expect(count).toBe(1);
  });

  it('should clear the roles', async () => {
    await Roles.clear();

    const roles = await Roles.get();

    expect(roles).toHaveLength(0);
  });
});
