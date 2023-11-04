require('dotenv').config()
require('../models/db')
const User = require('../models/user');
(async () => {
    for (let i = 0; i < 250; i++) {
        const user = await User({
            username: "User" + i.toString(),
            email: "email" + i.toString() + "@gmail.com",
            password: "password",
        });
        await user.save();
    }
})();