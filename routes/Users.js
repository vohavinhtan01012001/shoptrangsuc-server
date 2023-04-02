const express = require('express')
const router = express.Router()
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/register', async (req, res) => {
    const { fullName, email, password, address, phone } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
        res.json({ status: 400, message: "Email này đã tồn tại!" });
    }
    else {
        bcrypt.hash(password, 10).then(hash => {
            Users.create({ fullname: fullName, address: address, email: email, password: hash, phone: phone, role: 0 });
            res.json({ status: 200, message: 'Đăng ký thành công!' });
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
        res.json({ status: 400, message: "Email chưa được đăng ký" });
    }
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ status: 400, message: "Mật khẩu không đúng!" });
            }
            else {
                const accessToken = sign({ email: user.email, id: user.id, fullname: user.fullname, role: user.role }, "importantsecret");
                res.json({ status: 200, message: "Đăng nhập thành công!", accessToken: accessToken });
            }
        })
    }
});

router.get('/auth', validateToken, async (req, res) => {
    res.json(req.user);
})



module.exports = router;