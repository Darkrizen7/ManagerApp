const User = require('../models/user');
const { tl } = require('../utils/translator');

exports.isAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin()) {
        res.status(401).json({ sucess: false, message: tl("unauthorized_access") });
        return;
    }
    next();
}