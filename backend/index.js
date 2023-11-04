const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config()
require('./models/db')

const userRouter = require('./routes/user');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);

app.get('', (req, res) => {
    res.send("<h1> Hellooooo World </h1>");
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});