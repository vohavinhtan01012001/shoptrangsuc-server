const express = require('express')
const router = express.Router()
const { Products } = require('../models');

router.get("/", async (req, res) => {
    const products = await Products.findAll();
    res.json(products);
})

module.exports = router;