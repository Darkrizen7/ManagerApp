const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { tl } = require('../utils/translator');

// Check if user is authed
exports.isAuth = async (req, res, next) => {
    // Retrieve token from cookies
    const token = req.cookies.token;
    // Check if no token
    if (!token) {
        return res.status(401).json({ sucess: false, message: tl("no_token") });
    }


    try {
        // Decoding token
        const decode = jwt.verify(token, process.env.JWT_KEY);
        // Retrieving user from token
        const user = await User.findById(decode.userId);
        // Check if user exist with this token
        if (!user) {
            return res.status(401).json({ success: false, message: tl("user_not_found") });
        }
        // Setting user in the req for next steps
        req.user = user;
        const tokens = req.user.tokens || []
        if (tokens.filter(t => t.token == token).length < 1) {
            return res.status(401).json({ sucess: false, message: tl("invalid_token") });
        }
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: error.message });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: tl("session_expired"),
            });
        }
        res.status(401).json({ success: false, message: tl("internal_server_error") });
    }
};