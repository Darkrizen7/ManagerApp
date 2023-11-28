const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [8, "Le nom doit faire au minimum 5 caractères"],
    },
    desc: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    type: {
        type: String,
    },
    approved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    approved_at: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    strict: false,
});
module.exports = mongoose.model('Transaction', transactionSchema)