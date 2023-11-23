const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

const {
    get,
    getProof,
    update,
    create,
    remove,
    approve,
} = require('../controllers/transaction');

const {
    isAuth,
} = require('../middlewares/auth');

router.get('/proof', isAuth, getProof);
router.put('/approve', isAuth, approve);

router.get('/', isAuth, get);
router.post('/', isAuth, create);
router.delete('/', isAuth, remove);
router.put('/', isAuth, update);



module.exports = router;