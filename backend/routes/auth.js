const express = require('express');

const router = express.Router();

const {
    register,
    login,
    logout,
    checkToken,
} = require('../controllers/auth');

const {
    validateUserRegister,
    validateUserLogin,
    userValidation,
} = require('../middlewares/validation/auth');

const {
    isAuth,
} = require('../middlewares/auth');

router.post('/register', validateUserRegister, userValidation, register);
router.post('/login', validateUserLogin, userValidation, login);
router.post('/logout', isAuth, logout);
router.post('/checkToken', isAuth, checkToken);

module.exports = router;