const express = require('express');
const fileupload = require("express-fileupload");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()
require('./models/db')

const { tl } = require('./utils/translator');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/list');
const memberRouter = require('./routes/member');
const transactionRouter = require('./routes/transaction');
const { test } = require('./controllers/test');

const app = express();

app.use(fileupload({
    createParentPath: true,
}));
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
    exposedHeaders: ["Content-Type", "Content-Disposition"]
}));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/lists', listRouter);
app.use('/members', memberRouter);
app.use('/transactions', transactionRouter);
app.post('/test', test);

app.get('', (req, res) => {
    res.send("<h1> Hellooooo World </h1>");
});

app.listen(3000, () => {
    console.log(tl("listening_port:") + 3000);
});
