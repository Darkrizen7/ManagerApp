const fs = require('fs');
const path = require('path');
const Transaction = require('../models/transaction');
const { tl } = require('../utils/translator');

exports.get = async (req, res) => {
    const { list, _id } = req.query;
    if (_id) {
        exports.getTransaction(req, res);
        return;
    }

    try {
        const transactions = await Transaction.find(list ? { list } : null).populate("list", "name _id");

        res.json({
            success: true,
            transactions
        });
    } catch (e) {
        res.json({
            success: false,
            error: e,
            message: e.message
        })
    }
}
exports.getTransaction = async (req, res) => {
    const { _id } = req.query;
    try {
        const transaction = await Transaction.findById(_id);

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
    } catch (e) {
        res.json({ success: false, error: e, message: e.message })
    }
}

exports.create = async (req, res) => {
    const { name, desc, amount, list } = req.body;

    try {
        const transaction = await Transaction({ name, desc, amount, list, user: req.user });
        await transaction.save();

        try {
            if (req.files) {
                let file = req.files.file;
                file.mv("./uploads/" + transaction._id + "/proof.jpg");
            }
        } catch (e) {
            console.log(e);
        }

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
    const { _id } = req.body;
    try {
        await Transaction.findByIdAndRemove(_id);
        res.json({
            success: true,
        })
    } catch (e) {
        res.json({ success: false, error: e, message: e.message })
    }
}

exports.update = async (req, res) => {
    const { _id, name, desc, amount } = req.body;
    try {
        const transaction = await Transaction.findByIdAndUpdate(_id, {
            name, desc, amount, approved: false, approved_by: null, approved_at: null
        }, { new: true });
        if (!transaction) {
            res.json({
                success: false,
                message: tl("transaction_not_found")
            })
            return;
        }

        try {
            if (req.files) {
                let file = req.files.file;
                file.mv("./uploads/" + _id + "/proof.jpg");
            }
        } catch (e) {
            console.log(e);
        }
        await transaction.populate("list", "list.name list._id");

        res.json({
            success: true,
            transaction,
        })
    } catch (e) {
        res.json({
            success: false,
            error: e,
            message: e.message
        })
    }
}

exports.approve = async (req, res) => {
    const { _id } = req.body;
    try {
        const transaction = await Transaction.findByIdAndUpdate(_id, {
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
    } catch (e) {
        res.json({
            success: false,
            error: e,
            message: e.message
        })
    }
}

exports.getProof = async (req, res) => {
    const { _id } = req.query;
    try {
        const imagePath = path.join(__dirname, "..", "uploads", _id, "proof.jpg");
        res.sendFile(imagePath, {}, err => {
        });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};