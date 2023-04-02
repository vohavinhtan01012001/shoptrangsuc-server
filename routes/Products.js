const express = require('express')
const router = express.Router()
const { Products, Categorys } = require('../models');

router.get("/", async (req, res) => {
    const products = await Products.findAll({include: [Categorys]});
    res.json(products);
})
router.get("/productDetail/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({ include: [Categorys], where: { id: id } })
    const categoryId = product.CategoryId;
    const listProduct = await Categorys.findOne({ where: { id: categoryId }, include: [Products] })
    res.json({ product: product, listProduct: listProduct });
})


router.get("/category/:id", async (req, res) => {
    const id = req.params.id;
    const listProduct = await Categorys.findOne({ include: [Products], where: { id: id } })
    res.json({ status: 200, listProduct: listProduct })
})

router.get("/admin/productedit/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({
      where: { id: id },
      include: [Categorys],
    });
    res.json({ product: product });
  });
  
  router.put("/admin/productupdate/:id", async (req, res) => {
    const id = req.params.id;
    const {
      categoryId,
      productName,
      price,
      salePrice,
      color,
      size,
      quantity,
      img1,
      img2,
      img3,
      img4,
    } = req.body;
    const product = await Products.findOne({ where: { id: id } });
    if (product) {
      await Products.update(
        {
          categoryId: categoryId,
          productName: productName,
          price: price,
          salePrice: salePrice,
          color: color,
          size: size,
          quantity: quantity,
          img1: img1,
          img2: img2,
          img3: img3,
          img4: img4,
        },
        { where: { id: id } }
      );
      res.json({ status: 200 });
    } else {
      res.json({ status: 401 });
    }
  });

module.exports = router;