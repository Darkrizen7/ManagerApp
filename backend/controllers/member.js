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
        res.json({ success: true, member });
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

//Remove a member from a list
exports.remove = async (req, res) => {
    const { _id } = req.body;
    try {
        const member = await Member.findByIdAndRemove(_id);
        res.json({ success: true });
        return;
    } catch (e) {
        res.json({ success: false, error: e, message: e.message });
    }
}

//Update a member from a list
exports.update = async (req, res) => {
    const { _id, surname, lastname, student_number, email, support, list } = req.body;
    const member = await Member.findByIdAndUpdate(_id, {
        $set: {
            surname, lastname, student_number, email, support
        }
    }, { new: true });
    res.json({ success: true, member });
}