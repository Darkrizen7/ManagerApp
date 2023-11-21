const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sharp = require('sharp');

const { tl } = require('../utils/translator');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
        return res.status(401).json({
            success: false,
            message: tl("email_already_used"),
        });

    const user = await User({
        username,
        email,
        password,
    });
    await user.save();

    res.json({
        success: true,
        user: { email: user.email, username: user.username },
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return res.status(401).json({
            success: false,
            message: tl("user_not_found"),
        });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return res.status(401).json({
            success: false,
            message: tl("email_password_notmatch"),
        });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: '1d',
    });

    let oldTokens = user.tokens || [];
    if (oldTokens.length) {
        oldTokens = oldTokens.filter(t => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
            if (timeDiff < 86400) {
                return t;
            }
        });
    }
    user.tokens = [...oldTokens, { token, signedAt: Date.now().toString() }];

    user.save();
    const userInfo = {
        username: user.username,
        email: user.email,
        role: user.role,
        member: user.member,
    };
    res.json({ success: true, user: userInfo, token });
};

exports.logout = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: tl("no_token") });
    }
    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: tl("logout_success") });
};

exports.checkToken = async (req, res) => {
    const { _id, username, email, role } = req.user;
    const user = { _id, username, email, role }
    res.json({ success: true, user });
}