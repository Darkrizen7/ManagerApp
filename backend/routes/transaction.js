const express = require('express');

const router = express.Router();

const {
    get,
    downloadMerged,
    update,
    create,
    remove,
    approve,
} = require('../controllers/transaction');

const {
    validateTransaction,
    transactionValidation
} = require('../middlewares/validation/transactions');

const {
    isAuth,
} = require('../middlewares/auth');


router.get('/download', isAuth, downloadMerged);
router.put('/approve', isAuth, approve);

router.get('/', isAuth, get);
router.post('/', isAuth, validateTransaction, transactionValidation, create);
router.put('/', isAuth, validateTransaction, transactionValidation, update);
router.delete('/', isAuth, remove);



module.exports = router;