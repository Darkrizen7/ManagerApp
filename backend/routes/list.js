const express = require('express');

const router = express.Router();

const {
    getAll,
    get,
    getForUser,
    create,
    remove,
} = require('../controllers/list');

const {
    isAuth,
} = require('../middlewares/auth');

// Listes
router.get('/', isAuth, getAll);
router.get('/get', isAuth, get);

router.post('/create', isAuth, create);
router.delete('/remove', isAuth, remove);

module.exports = router;