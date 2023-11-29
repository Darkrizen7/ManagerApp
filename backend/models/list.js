const mongoose = require('mongoose');
const Transaction = require('./transaction')

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    campagne: {
        type: String,
        required: true,
    },
}, {
    strict: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

listSchema.virtual('members', {
    ref: 'Member',
    localField: '_id',
    foreignField: 'list',
    justOne: false,
});
listSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'list',
    justOne: false,
})
listSchema.virtual('account');
listSchema.methods.getAccount = async function () {
    const totalValue = await this.transactions.reduce((acc, transaction) => {
        if (!transaction.approved) return acc;
        return acc + transaction.amount;
    }, 0);
    return totalValue;
};
listSchema.methods.fullPopulate = async function () {
    await this.populate("transactions");
    await this.populate({
        path: 'members',
        populate: {
            path: 'list'
        }
    });
    const account = await this.getAccount();
    this.account = account;
    return;
}
module.exports = mongoose.model('List', listSchema)