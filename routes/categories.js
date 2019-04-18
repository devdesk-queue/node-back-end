const router = require('express').Router();
const Categories = require('../models/categories');
const authorise = require('../middleware/authorise');
const validate = require('../middleware/validate');

/**
 * [GET] /api/categories
 * @returns an array of categories objects or error
*/
router.get('/', async (req, res) => {
  const categories = await Categories.get();
  res.status(200).json(categories);
});

/**
 * [POST] /api/categories
 * @payload - an object with name of the category
 * @returns - an object with new category
*/
router.post(
  '/',
  authorise('admin'),
  validate(Categories.schema, true),
  async ({ body: newCategory }, res) => {
    let [category] = await Categories.filter({ name: newCategory.name });
    if (category) return res.status(405).json({
      message: 'That category has already been defined.'
    });

    const [categoryID] = await Categories.add(newCategory);
    [category] = await Categories.get(categoryID);

    res.status(201).json(category);
  }
);

/**
 * [PUT] /api/categories/:id
 * @payload - an object with name of the category
 * @returns - an array with new category
*/
router.put(
  '/:id',
  authorise('admin'),
  validate(Categories.schema),
  async ({ params: { id }, body: changes }, res) => {
    let [category] = await Categories.filter({ name: changes.name });
    if (category) return res.status(405).json({
      message: 'That category has already been defined.'
    });

    const updated = await Categories.update(id, changes);
    if (!updated) return res.status(404).json({
      message: 'The category does not exist.'
    });

    [category] = await Categories.get(id);

    res.status(200).json(category);
  }
);

/**
 * [DELETE] /api/categories/:id
 * @payload - none
 * @returns - an array with new category
*/
router.delete(
  '/:id',
  authorise('admin'),
  async ({ params: { id } }, res) => {
    const category = await Categories.remove(id);
    if (category) {
      res.status(200).json({ id, message: `Category with ID ${id} was deleted.` });
    } else {
      res.status(404).json({ message: 'The category does not exist.' });
    }
  }
);



module.exports = router;
