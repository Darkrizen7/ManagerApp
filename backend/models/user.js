const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    tokens: {
        type: Object,
    },
    role: {
        type: String,
    }
}, {
    strict: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.virtual('member', {
    ref: 'Member',
    localField: 'email',
    foreignField: 'email',
})

userSchema.pre('save', { document: true, query: false }, async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hashSync(this.password, 8);
        this.password = hash;
        next();
        return;
    }
    next()
});

userSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('No password to compare with');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('BCrypt ERROR:', error.message);
    }
};

userSchema.methods.isAdmin = function () {
    return this.role == "admin";
}


userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({ email })
        if (user) return false

        return true
    } catch (error) {
        console.log('Error : ' + error.message);
    }
}
module.exports = mongoose.model('User', userSchema)