const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001


//Routers
const productRouter = require('./routes/Products');
app.use("/products",productRouter);

const userRouter = require('./routes/Users');
app.use("/auth",userRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
})