const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sharp = require('sharp');

exports.getAll = async (req, res) => {
    const users = await User.find().select("username email _id");
    res.json({ success: true, data: users });
};