const express = require('express')
const router = express.Router()
const { Products, Categorys } = require('../models');

router.get("/", async (req, res) => {
    const products = await Products.findAll();
    res.json(products);
})
router.get("/productDetail/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({ where: { id: id } })
    const categoryId = product.CategoryId;
    const listProduct = await Categorys.findOne({ where: { id: categoryId }, include: [Products] })
    res.json({ product: product, listProduct: listProduct });
})


module.exports = router;