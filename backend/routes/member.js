const express = require('express');

const router = express.Router();

const {
    create,
    remove,
    update,
} = require('../controllers/member');

const {
    isAuth,
} = require('../middlewares/auth');

// Listes
router.post('/', isAuth, create);
router.delete('/', isAuth, remove);
router.put('/', isAuth, update);

module.exports = router;