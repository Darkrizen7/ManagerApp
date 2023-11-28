const { check, validationResult } = require('express-validator');
const { tl } = require('../../utils/translator');
const { JSONErr } = require('../../lib/error_manager');

exports.validateMember = [
    check('surname')
        .trim().not().isEmpty().withMessage(tl("invalid_surname"))
        .isString().withMessage(tl("invalid_surname"))
        .isLength({ min: 2 }).withMessage(tl("invalid_surname")),
    check('lastname')
        .trim().not().isEmpty().withMessage(tl("invalid_lastname"))
        .isString().withMessage(tl("invalid_lastname"))
        .isLength({ min: 2 }).withMessage(tl("invalid_lastname")),
    check('student_number')
        .trim().not().isEmpty().withMessage(tl("invalid_student_number"))
        .isNumeric().withMessage(tl("invalid_student_number")),
    check('email')
        .trim().not().isEmpty().withMessage(tl("invalid_email"))
        .isString().withMessage(tl("invalid_email"))
        .isEmail().withMessage(tl("invalid_email")),
];

exports.memberValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    return JSONErr(res, error);
};