const List = require('../models/list');
const Member = require('../models/member');
const { tl } = require('../utils/translator');

// ------------------------------------- List CRUD ------------------------------------- //
exports.create = async (req, res) => {
    const { name, campagne } = req.body;
    try {
        const list = await List({ name, campagne });
        await list.save()
        const lists = await List.find({}).populate("members");
        res.json({ success: true, lists });
    } catch (e) {
        res.json({ success: false, error: e, message: e.message })
    }
}
exports.remove = async (req, res) => {
    const { _id } = req.body;
    try {
        const list = await List.findById({ _id })
        if (!list) {
            res.json({ success: false, message: tl("list_not_found") })
        }

        await list.model('Member').deleteMany({ list: list._id });
        await list.model('Transaction').deleteMany({ list: list._id });
        await List.findByIdAndDelete({ _id });

        const lists = await List.find({}).populate("members");
        res.json({ success: true, lists });
    } catch (e) {
        res.json({ success: false, error: e, message: e.message })
    }
}

// Get All lists
getAll = async (req, res) => {
    const lists = await List.find({}).populate("members").exec();
    res.json({ success: true, lists });
};

// Get One list by name
exports.get = async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        getAll(req, res);
        return;
    }
    if (_id === "mine") {
        getForUser(req, res);
        return;
    }
    try {
        const list = await List.findById({ _id });
        if (!list) {
            res.json({ success: false, message: tl("list_not_found") });
            return;
        }
        await list.fullPopulate();
        res.json({ success: true, list });
    } catch (e) {
        res.json({ success: false, error: e, message: e.message });
    }
};

// Get the list of the authed user
const getForUser = async (req, res) => {
    const { email } = req.user;
    try {
        const member = await Member.findOne({ email });
        if (!member) {
            res.json({ success: false, message: tl("user_has_no_list") });
            return;
        }
        req.query._id = member.list._id;
        exports.get(req, res);
    } catch (e) {
        res.json({ success: false, error: e, message: e.message });
    }
}