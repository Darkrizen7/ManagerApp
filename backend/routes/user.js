const express = require('express');

const router = express.Router();

const {
    getAll,
} = require('../controllers/user');

const {
    isAuth,
} = require('../middlewares/auth');
const {
    isAdmin,
} = require('../middlewares/role');

router.get('/', isAuth, getAll);

module.exports = router;