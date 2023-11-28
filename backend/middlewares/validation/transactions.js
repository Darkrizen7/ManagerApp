const { check, validationResult } = require('express-validator');
const { tl } = require('../../utils/translator');
const { JSONErr } = require('../../lib/error_manager');

exports.validateTransaction = [
    check('name')
        .trim().not().isEmpty().withMessage(tl("invalid_transaction_name"))
        .isString().withMessage(tl("invalid_transaction_name"))
        .isLength({ min: 3, max: 20 }).withMessage(tl("transaction_name_validation")),
    check('amount')
        .trim().not().isEmpty()
        .isNumeric().withMessage(tl("invalid_amount"))
];

exports.transactionValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    return JSONErr(res, error);
};