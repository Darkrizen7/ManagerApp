const express = require('express');

const router = express.Router();

const {
    create,
    remove,
    update,
    get,
    getForUser,
} = require('../controllers/member');

const {
    validateMember,
    memberValidation,
} = require('../middlewares/validation/members');
const {
    isAuth,
} = require('../middlewares/auth');

// Listes
router.get('/', isAuth, get);
router.post('/', isAuth, validateMember, memberValidation, create);
router.put('/', isAuth, validateMember, memberValidation, update);
router.delete('/', isAuth, remove);

router.get('/user', isAuth, getForUser);
module.exports = router;