const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()
require('./models/db')

const userRouter = require('./routes/user');

const app = express();

app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());


app.use('/users', userRouter);

app.get('', (req, res) => {
    res.send("<h1> Hellooooo World </h1>");
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});
