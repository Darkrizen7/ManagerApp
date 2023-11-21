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
router.post('/create', isAuth, create);
router.delete('/remove', isAuth, remove);
router.put('/update', isAuth, update);

module.exports = router;