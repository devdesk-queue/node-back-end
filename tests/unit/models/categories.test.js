const Categories = require('../../../models/categories');

describe('categories', () => {
  beforeAll(async () => { await Categories.clear(); });
  afterAll(async () => { await Categories.clear(); });

  it('should add new categories', async () => {
    await Categories.add({ name: 'React' });
    await Categories.add({ name: 'Administration' });

    const categories = await Categories.get();
    expect(categories).toHaveLength(2);
  });

  it('should find a category', async () => {
    const [category] = await Categories.filter({ name: 'React' });
    expect(category).toBeDefined();
    expect(category).toHaveProperty('id', 1);
  });

  it('should update a category', async () => {
    const count = await Categories.update(1, { name: 'Vue' });
    expect(count).toBe(1);
  });

  it('should delete a category', async () => {
    const count = await Categories.remove(1);
    expect(count).toBe(1);
  });

  it('should clear the categories', async () => {
    await Categories.clear();

    const categories = await Categories.get();

    expect(categories).toHaveLength(0);
  });
});
