const { tl } = require('../utils/translator');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    }).then(() => {
        console.log(tl("db_connected"));
    }).catch(err => console.log(err.message));