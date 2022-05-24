const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({include: [{ model: Product}]});
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findOne({include: [{ model: Product}], where: { id: req.params.id }});
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(req.body, {where: { id: req.params.id }});
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({where: { id: req.params.id }});
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
