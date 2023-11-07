const express = require('express');

const router = express.Router();

const {
    createUser,
    signIn,
    signOut,
    profile,
    getUsers,
} = require('../controllers/user');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
} = require('../middlewares/validation/user');

const {
    isAuth,
} = require('../middlewares/auth');
const {
    isAdmin,
} = require('../middlewares/role');

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, signIn);
router.post('/sign-out', isAuth, signOut);
router.get('/profile', isAuth, isAdmin, profile);
router.get('/users', isAuth, getUsers);

module.exports = router;