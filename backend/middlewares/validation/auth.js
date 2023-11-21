const { check, validationResult } = require('express-validator');
const { tl } = require('../../utils/translator');

exports.validateUserRegister = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage(tl("invalid_username"))
        .isString()
        .withMessage(tl("invalid_username"))
        .isLength({ min: 3, max: 20 })
        .withMessage(tl("username_validation")),
    check('email').normalizeEmail().isEmail().withMessage(tl("invalid_email")),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage(tl("invalid_password"))
        .isLength({ min: 8, max: 20 })
        .withMessage(tl("password_validation")),
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
};

exports.validateUserLogin = [
    check('email').trim().isEmail().withMessage(tl("email_pwd_required")),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage(tl("email_pwd_required")),
];