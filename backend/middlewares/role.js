const User = require('../models/user');

exports.isAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user){
        res.json({sucess: false, message: "Not authenticated"});
        return;
    }
    if (!user.isAdmin()){
        res.json({sucess: false, message: "Not admin"});
        return;
    }
    next();
}