const express = require('express');

const router = express.Router();

const {
    create,
    remove,
    update,
    get,
} = require('../controllers/member');

const {
    isAuth,
} = require('../middlewares/auth');

// Listes
router.get('/', isAuth, get);
router.post('/', isAuth, create);
router.delete('/', isAuth, remove);
router.put('/', isAuth, update);

module.exports = router;