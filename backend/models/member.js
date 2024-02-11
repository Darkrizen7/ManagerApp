const mongoose = require('mongoose');
const User = require('./user');
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
    phone: {
        type: String,
        default: "",
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
memberSchema.methods.createUser = async () => {
    var password = "";
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    try {

        const usr = new User({
            username: this.surname + " " + this.lastname,
            email: this.email,
            password: password,
        });
        usr.markModified("password");
        await usr.save();
    } catch (e) { return { success: false, e } };
    return { success: true, password };
}
module.exports = mongoose.model('Member', memberSchema)