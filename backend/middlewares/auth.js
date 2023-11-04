const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decode.userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        req.user = user;
        const tokens = req.user.tokens || []
        if (tokens.filter(t => t.token == token).length < 1) {
            return res.json({ sucess: false, message: 'Invalid token' });
        }
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: error.message });
        }
        if (error.name === 'TokenExpiredError') {
            return res.json({
                success: false,
                message: 'sesson expired try sign in!',
            });
        }
        res.res.json({ success: false, message: 'Internal server error!' });
    }
};