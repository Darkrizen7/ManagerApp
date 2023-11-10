const express = require('express');

const router = express.Router();

const {
    createUser,
    signIn,
    signOut,
    profile,
    getUsers,
    isTokenValid,
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
router.post('/login', validateUserSignIn, userValidation, signIn);
router.post('/logout', isAuth, signOut);
router.get('/isTokenValid', isAuth, isTokenValid);
router.get('/profile', isAuth, profile);
router.get('/', isAuth, getUsers);

module.exports = router;