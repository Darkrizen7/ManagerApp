const express = require('express');

const router = express.Router();

const {
    getAll,
    get,
    getForUser,
    update,
    create,
    remove,
} = require('../controllers/list');

const {
    isAuth,
} = require('../middlewares/auth');

// Listes
router.get('/', isAuth, get);
router.post('', isAuth, create);
router.put('', isAuth, update);
router.delete('/', isAuth, remove);

module.exports = router;