const List = require('../models/list');
const Member = require('../models/member');
const User = require('../models/user');
const { tl } = require('../utils/translator');
const { hasAccess } = require('../lib/access_manager');
const { JSONErr } = require('../lib/error_manager');

// ------------------------------------- Member CRUD ------------------------------------- //
//Add a member to a list
exports.create = async (req, res) => {
    const { surname, lastname, student_number, email, support, role, list } = req.body
    const accessAllowed = await hasAccess(req, "members.create", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const listToAdd = await List.findById(list).populate("members");
        if (!listToAdd) return JSONErr(res, tl("list_not_found;") + list)
        const countOff = listToAdd.members.filter((mb) => !mb.support).length;
        const countSupp = listToAdd.members.filter((mb) => mb.support).length;
        if ((support === "false" && countOff >= 38) || (support === "true" && countSupp >= 8)) return JSONErr(res, "Limite atteinte");
        const member = await Member({ surname, lastname, student_number, email, support, role, list });
        await member.save();
        await member.populate("list");
        var password = "";
        try {
            const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const passwordLength = 12;
            for (var i = 0; i <= passwordLength; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            const usr = new User({
                username: member.surname + " " + member.lastname,
                email: member.email,
                password: password,
            });
            usr.markModified("password");
            await usr.save();
        } catch (e) { console.log(e); return JSONErr(res, e) };
        res.json({ success: true, member: member });
    } catch (e) { console.log(e); return JSONErr(res, e) };
}

//Remove a member from a list
exports.remove = async (req, res) => {
    const { _id } = req.body;
    try {
        const member = await Member.findById(_id).populate("list");
        const accessAllowed = await hasAccess(req, "members.delete", member.list ? member.list._id : null)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        const mb = await Member.findByIdAndDelete(_id);
        res.json({ success: true });
        return;
    } catch (e) { return JSONErr(res, e) }
}

//Update a member from a list
exports.update = async (req, res) => {
    const { _id, surname, lastname, student_number, email, support, role, list } = req.body;
    const accessAllowed = await hasAccess(req, "members.update", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))
    const otherAccess = await hasAccess(req, "members.update");
    if (role == "RCorpo" && !otherAccess) return JSONErr(res, "Vous ne pouvez pas changer de respo corpo");
    try {
        const member = await Member.findByIdAndUpdate(_id, {
            $set: {
                surname, lastname, student_number, email, role, support
            }
        }, { new: true });
        await member.populate("list");
        res.json({ success: true, member });
    } catch (e) { return JSONErr(res, e) }
}

exports.get = async (req, res) => {
    const { list } = req.query;
    const accessAllowed = await hasAccess(req, "members.read", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const members = await Member.find(list ? { list } : null).populate("list", "name _id");
        res.json({ success: true, members });
    } catch (e) { return JSONErr(res, e) }
}

exports.getForUser = async (req, res) => {
    const { email } = req.user;
    try {
        const member = await Member.findOne({ email }).populate("list", "name _id");
        if (!member) return JSONErr(res, tl("member_not_found"));
        res.json({ success: true, member });
    } catch (e) { return JSONErr(res, e) }
}