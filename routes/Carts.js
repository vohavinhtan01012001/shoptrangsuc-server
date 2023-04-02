const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router = express.Router()
const { Products, Categorys, Carts } = require('../models');


router.get("/", validateToken, async (req, res) => {
    const userId = req.user.id;
    const cart = await Carts.findAll({ include: [Products], where: { UserId: userId } });
    res.json(cart);
});

router.post("/addcart", validateToken, async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.id;
    const cart = await Carts.findOne({ where: { ProductId: productId, UserId: userId } })
    if (req.user) {
        if (cart) {
            res.json({ status: 201, message: "Sản phẩm đã được thêm rồi!" })
        }
        else {
            await Carts.create({ ProductId: productId, quantity: quantity, UserId: req.user.id })
            res.json({ status: 200, message: "Thêm thành công!" });
        }
    }
    else {
        res.json({ status: 401, message: "Vui lòng đăng nhập trước khi thêm vào giỏ hàng" })
    }
})

router.put("/updatequantity/:id/:slug", async (req, res) => {
    const { id, slug } = req.params;
    const cart = await Carts.findOne({ where: { id: id } })
    const productId = cart.ProductId;
    const product = await Products.findOne({ where: { id: productId } })
    if (slug == "inc") {
        if (cart.quantity < product.quantity) {
            cart.quantity += 1;
        }
        else {
            cart.quantity += 0;
        }
    } else if (slug == "dec") {
        if (cart.quantity > 1) {
            cart.quantity -= 1;
        }
        else {
            cart.quantity -= 0;
        }
    }
    await Carts.update({ quantity: cart.quantity }, { where: { id: id } })
    res.json({ status: 200, message: "Số lượng đã được cập nhật" })
})


router.delete("/delete/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const cart = await Carts.findOne({ where: { id: id, UserId: userId } })
    if (cart) {
        Carts.destroy({ where: { id: id, UserId: userId } })
        res.json({ status: 200, message: "Xóa thành công!" })
    }
    else {
        res.json({ status: 404, message: "Không tìm thấy sản phẩm" })
    }
})

router.get("/showcart", validateToken, async (req, res) => {
    const userId = req.user.id;
    const cart = await Carts.findAll({ where: { UserId: userId } })
    if(cart){
        res.json({status:200,cart:cart})
    }
    else{
        res.json({status:201,cart:cart})
    }
})

module.exports = router;
