const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000


//Routers


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
})