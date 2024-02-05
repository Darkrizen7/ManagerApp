require('dotenv').config()

const Member = require('./models/member')
const User = require('./models/user')
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    }).then(async () => {
        console.log("db connected");
        const members = await Member.find({ role: { "$elemMatch": ["RCorpo"] } }).exec();
        console.log(members.length);
        return;
        // const members = await Member.find({ role: "RCorpo" }).exec();
        // const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // const passwordLength = 12;
        // const pwds = [];
        // await User.deleteMany({ "email": { "$ne": "arthur.levannier@corpo-emlyon.com" } })
        // for (const member of members) {
        //     var password = "";
        //     for (var i = 0; i <= passwordLength; i++) {
        //         var randomNumber = Math.floor(Math.random() * chars.length);
        //         password += chars.substring(randomNumber, randomNumber + 1);
        //     }
        //     pwds.push([member.email, password]);
        //     const usr = new User({
        //         username: member.surname + " " + member.lastname,
        //         email: member.email,
        //         password: password,
        //     });
        //     usr.markModified("password");
        //     await usr.save();
        //     console.log("User created :", usr.username);
        // }
        // var txt = "";
        // for (const [user, pwd] of pwds) {
        //     txt += user + "," + pwd + "\n";
        // }
        // const f = fs.writeFileSync("output.csv", txt);
    }).catch(err => console.log(err.message));