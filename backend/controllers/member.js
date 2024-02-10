const List = require('../models/list');
const Member = require('../models/member');
const { tl } = require('../utils/translator');
const { hasAccess } = require('../lib/access_manager');
const { JSONErr } = require('../lib/error_manager');

const fs = require("fs");
const writeXlsxFile = require('write-excel-file/node')

// ------------------------------------- Member CRUD ------------------------------------- //
//Add a member to a list
exports.create = async (req, res) => {
    const { surname, lastname, student_number, email, support, role, list } = req.body
    const accessAllowed = await hasAccess(req, "members.create", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))
    const otherAccess = await hasAccess(req, "members.update");
    if (role == "RCorpo" && !otherAccess) return JSONErr(res, "Vous ne pouvez pas changer de respo corpo");

    try {
        const listToAdd = await List.findById(list).populate("members");
        if (!listToAdd) return JSONErr(res, tl("list_not_found;") + list)
        const countOff = listToAdd.members.filter((mb) => !mb.support).length;
        const countSupp = listToAdd.members.filter((mb) => mb.support).length;
        if ((support === "false" && countOff >= 30) || (support === "true" && countSupp >= 8)) return JSONErr(res, "Limite atteinte");
        const member = await Member({ surname, lastname, student_number, email, support, role, list });
        await member.save();
        await member.populate("list");
        // const { s, e, password } = await member.createUser();
        // res.json({ success: true, member: member, new_password: password });
        res.json({ success: true, member: member });
    } catch (e) { return JSONErr(res, e) };
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
    const listToAdd = await List.findById(list).populate("members");
    if (!listToAdd) return JSONErr(res, tl("list_not_found;") + list)
    const countOff = listToAdd.members.filter((mb) => !mb.support).length;
    const countSupp = listToAdd.members.filter((mb) => mb.support).length;
    if ((support === "false" && countOff >= 30) || (support === "true" && countSupp >= 8)) return JSONErr(res, "Limite atteinte");
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

exports.toExcel = async (req, res) => {
    const { _id } = req.query;
    var members;
    var fileName = "TotalToDownload.xlsx";
    if (_id) {
        const list = await List.findById(_id);
        members = await Member.find({ list: _id }).populate("list");
        fileName = `${list.name}-${list.pre_name}.xlsx`;
    } else {
        members = await Member.find().pupulate("list");
    }
    const filePath = fileName;

    const data = [];
    const headerRow = [
        { value: "Prénom", fontWeight: "bold", },
        { value: "Nom", fontWeight: "bold", },
        { value: "Numéro étudiant", fontWeight: "bold", },
        { value: "Rôle", fontWeight: "bold", },
    ]
    data.push(headerRow);
    members.forEach((mb) => {
        data.push([
            { type: String, value: mb.surname },
            { type: String, value: mb.lastname },
            { type: String, value: mb.student_number },
            { type: String, value: mb.role },
            { type: String, value: mb.list.name },
        ])
    })
    const output = fs.createWriteStream(filePath);
    const stream = await writeXlsxFile(data);
    stream.pipe(output);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    res.set('Content-Disposition', `filename="${fileName}"`);
    res.set('Content-Type', 'application/pdf');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}