const express = require('express');

const router = express.Router();

const {
    get,
    getAll,
    getByList,
    update,
    create,
    remove,
    approve,
} = require('../controllers/transaction');

const {
    isAuth,
} = require('../middlewares/auth');

router.get('/get/:transactionId', isAuth, get);
router.get('/getByList/:list', isAuth, getByList);
router.get('/', isAuth, getAll);

router.post('/create', isAuth, create);
router.delete('/remove', isAuth, remove);
router.put('/update', isAuth, update);
router.put('/approve', isAuth, approve);

module.exports = router;