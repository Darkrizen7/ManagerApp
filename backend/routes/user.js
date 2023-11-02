const express = require('express');

const router = express.Router();

const {
    createUser,
    signIn,
} = require('../controllers/user');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
} = require('../middlewares/validation/user');

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, signIn);

module.exports = router;