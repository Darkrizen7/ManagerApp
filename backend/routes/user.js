const express = require('express');

const router = express.Router();

const {
    createUser,
    signIn,
    signOut,
} = require('../controllers/user');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
} = require('../middlewares/validation/user');

const {
    isAuth,
} = require('../middlewares/auth');

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, signIn);
router.post('/sign-out', isAuth, signOut);

module.exports = router;