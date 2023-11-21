const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    student_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    support: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
    }
}, {
    strict: false,
});

module.exports = mongoose.model('Member', memberSchema)