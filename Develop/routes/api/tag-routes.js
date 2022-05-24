const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const TagData = await Tag.findAll({include: [{ model: Product}]});
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findOne({include: [{ model: Product}],
      where: {id: req.params.id}});
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.status(200).json("Created");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
     await Tag.update(req.body, {where: { id: req.params.id }});
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
     await Tag.destroy({
      where: {id: req.params.id}});
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
