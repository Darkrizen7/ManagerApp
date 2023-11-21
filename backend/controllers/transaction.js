const Transaction = require('../models/transaction');
const { tl } = require('../utils/translator');

exports.getByList = async (req, res) => {
    const { list } = req.params;
    const transactions = await Transaction.find({ list }).populate("list", "name _id");

    res.json({
        success: true,
        transactions
    })
}
exports.getAll = async (req, res) => {
    const transactions = await Transaction.find().populate("list", "name _id");

    res.json({
        success: true,
        transactions
    });
}
exports.get = async (req, res) => {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
        res.json({
            success: false,
            message: tl("transaction_not_found")
        })
        return;
    }

    await transaction.populate("list", "list.name list._id");
    await transaction.populate("approved_by");
    res.json({
        success: true,
        transaction,
    });
}

exports.create = async (req, res) => {
    const { name, desc, amount, list } = req.body;

    try {
        const transaction = await Transaction({ name, desc, amount, list, user: req.user });
        await transaction.save();
        res.json({
            success: true,
            transaction,
        })
    } catch (e) {
        res.json({
            success: false,
            error: e,
            message: e.message,
        })
    }
}

exports.remove = async (req, res) => {
    const { transactionId } = req.body;
    await Transaction.findByIdAndRemove(transactionId);
    res.json({
        success: true,
    })
}

exports.update = async (req, res) => {
    const { transactionId, name, desc, amount } = req.body;
    const transaction = Transaction.findByIdAndUpdate(transactionId, {
        name, desc, amount, approved: false, approved_by: null, approved_at: null
    }, { new: true });

    if (!transaction) {
        res.json({
            success: false,
            message: tl("transaction_not_found")
        })
        return;
    }
    res.json({
        success: true,
        transaction,
    })
}

exports.approve = async (req, res) => {
    const { transactionId } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(transactionId, {
        approved: true, approved_by: req.user, approved_at: Date.now()
    }, { new: true });

    if (!transaction) {
        res.json({
            success: false,
            message: tl("transaction_not_found")
        })
        return;
    }

    await transaction.populate("list", "list.name list._id");
    await transaction.populate("approved_by");
    res.json({
        success: true,
        transaction,
    });
}