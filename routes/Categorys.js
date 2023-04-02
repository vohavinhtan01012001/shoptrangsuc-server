const express = require('express')
const router = express.Router()
const { Products, Categorys } = require('../models');

router.get("/", async (req, res) => {
    const category = await Categorys.findAll();
    res.json(category);
})

router.get("/category/:id", async (req, res) => {
    const id = req.params.id;
    const category = await Categorys.findOne({
      where: { id: id },
      include: [Products],
    });
    const categoryId = product.CategoryId;
    const listProduct = await Categorys.findOne({
      where: { id: categoryId },
      include: [Products],
    });
    res.json({ category: category, listProduct: listProduct });
  });
  router.get("/admin/categoryedit/:id", async (req, res) => {
    const id = req.params.id;
    const category = await Categorys.findOne({
      where: { id: id },
    });
    res.json(category);
  });
  router.put("/admin/categoryupdate/:id", async (req, res) => {
    const id = req.params.id;
    const { categoryName } = req.body;
    const category = await Categorys.findOne({ where: { id: id } });
    if (category) {
      await Categorys.update(
        {
          categoryName: categoryName,
        },
        { where: { id: id } }
      );
      res.json({ status: 200 });
    } else {
      res.json({ status: 401 });
    }
  });

module.exports = router;
