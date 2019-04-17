const router = require('express').Router();
const Categories = require('../models/categories');
const restricted = require('../middleware/restricted');
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
 * @returns - an array with new category
*/
router.post(
  '/',
  restricted,
  authorise,
  validate(Categories.schema, true),
  async ({ body: newCategory }, res) => {
    const [categoryID] = await Categories.add(newCategory);
    const category = await Categories.get(categoryID);
    res.status(201).json(category);
  }
);

module.exports = router;
