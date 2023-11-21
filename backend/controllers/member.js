const List = require('../models/list');
const Member = require('../models/member');
const { tl } = require('../utils/translator');

// ------------------------------------- Member CRUD ------------------------------------- //
//Add a member to a list
exports.create = async (req, res) => {
    const { surname, lastname, student_number, email, support, role, list } = req.body
    try {
        const listToAdd = await List.findById(list);
        if (!listToAdd) {
            res.json({ success: false, message: tl("list_not_found:") + list });
            return
        }
        const member = await Member({ surname, lastname, student_number, email, support, role, list });
        await member.save();
        await listToAdd.populate('members');
        res.json({ success: true, list: listToAdd });
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

//Remove a member from a list
exports.remove = async (req, res) => {
    const { email } = req.body;
    const member = await Member.findOne({ email });
    if (!member) {
        res.json({ success: false, message: tl("member_not_found") });
        return;
    }
    const list = await List.findById(member.list);
    if (!list) {
        res.json({ success: false, message: tl("list_not_found") })
    }
    await Member.findOneAndRemove({ email });
    await list.populate('members');
    res.json({ success: true, list });
}

//Update a member from a list
exports.update = async (req, res) => {
    const { _id, surname, lastname, student_number, email, support, list } = req.body;
    const member = await Member.findByIdAndUpdate(_id, {
        $set: {
            surname, lastname, student_number, email, support
        }
    }, { new: true });
    const listToSend = await List.findById(list).populate('members');
    if (!listToSend) {
        res.json({ success: false, message: tl("list_not_found") })
    }
    res.json({ success: true, list: listToSend });
}